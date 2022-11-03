const axios = require('axios');

const TOKEN_TTL_IN_SECONDS = 60 * 60 * 6;

const sendResponse = (data, status = 200) => {
  const response = new Twilio.Response();
  response.setStatusCode(status);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
}

const contactWebchatOrchestrator = async (formData, customerFriendlyName, context) => {
  const params = new URLSearchParams();
  params.append("AddressSid", context.ADDRESS_SID);
  params.append("ChatFriendlyName", "Webchat widget");
  params.append("CustomerFriendlyName", customerFriendlyName);
  params.append(
    "PreEngagementData",
    JSON.stringify({
      ...formData,
      friendlyName: customerFriendlyName,
    })
  );

  let conversationSid;
  let identity;

  try {
    const res = await axios.post(
      `https://flex-api.twilio.com/v2/WebChats`,
      params,
      {
        auth: {
          username: context.ACCOUNT_SID,
          password: context.AUTH_TOKEN,
        },
      }
    );
    ({ identity, conversation_sid: conversationSid } = res.data);
  } catch (e) {
    throw e.response.data;
  }
  return {
    conversationSid,
    identity,
  };
};

const createToken = (context, identity) => {
  const AccessToken = require('twilio').jwt.AccessToken;
  const { ChatGrant } = AccessToken;

  const chatGrant = new ChatGrant({
    serviceSid: context.CONVERSATIONS_SERVICE_SID,
  });

  const token = new AccessToken(
    context.ACCOUNT_SID,
    context.TWILIO_API_KEY_SID,
    context.TWILIO_API_KEY_SECRET,
    {
      identity,
      ttl: TOKEN_TTL_IN_SECONDS,
    }
  );
  token.addGrant(chatGrant);
  const jwt = token.toJwt();
  return jwt;
};

const sendUserMessage = (context, conversationSid, identity, messageBody) => {
  return context.getTwilioClient()
    .conversations.conversations(conversationSid)
    .messages.create({
      body: messageBody,
      author: identity,
      xTwilioWebhookEnabled: true, // trigger webhook
    })
};

const sendWelcomeMessage = (context, conversationSid, customerFriendlyName) => {
  return context.getTwilioClient()
    .conversations.conversations(conversationSid)
    .messages.create({
      body: `Welcome ${customerFriendlyName}! How can we help you today.`,
      author: "Concierge",
    })
};

exports.handler = async function (context, event, callback) {
  const { formData } = event;
  const { query, friendlyName } = event;

  const customerFriendlyName = friendlyName || "Customer";

  let conversationSid;
  let identity;

  const response = new Twilio.Response();

  // Hit Webchat Orchestration endpoint to generate conversation and get customer participant sid
  try {
    const result = await contactWebchatOrchestrator(
      formData,
      customerFriendlyName,
      context
    );
    ({ identity, conversationSid } = result);
  } catch (error) {
    return callback(
      null,
      sendResponse(
        { message: `Couldn't initiate WebChat: ${error?.message}` },
        400
      )
    );
  }

  // Generate token for customer
  const token = createToken(context, identity);

  await sendWelcomeMessage(context, conversationSid, customerFriendlyName);

  // OPTIONAL — if user query is defined
  if (query) {
    // use it to send a message in behalf of the user with the query as body
    sendUserMessage(context, conversationSid, identity, query);
  }


  return callback(null, sendResponse({
    token,
    conversationSid,
    expiration: Date.now() + TOKEN_TTL_IN_SECONDS * 1000,
    agentId: formData?.agentId
  }));
};
