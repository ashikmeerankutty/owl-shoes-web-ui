const jwt = require("jsonwebtoken");

const TOKEN_TTL_IN_SECONDS = 60 * 60 * 6;

const sendResponse = (data, status = 200) => {
  const response = new Twilio.Response();
  response.setStatusCode(status);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
};

const createToken = (context, identity) => {
  const AccessToken = require("twilio").jwt.AccessToken;
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

exports.handler = async function (context, event, callback) {
  let providedIdentity;

  try {
    const validatedToken = await new Promise((res, rej) =>
      jwt.verify(
        event.token,
        context.TWILIO_API_KEY_SECRET,
        {},
        (err, decoded) => {
          if (err) return rej(err);
          return res(decoded);
        }
      )
    );
    providedIdentity = validatedToken?.grants?.identity;
  } catch (e) {
    return callback(
      null,
      sendResponse(
        {
          message: "Failed validating token",
        },
        403
      )
    );
  }

  // Generate refresh token
  const refreshedToken = createToken(context, providedIdentity);

  return callback(
    null,
    sendResponse({
      token: refreshedToken,
      expiration: Date.now() + TOKEN_TTL_IN_SECONDS * 1000,
    })
  );
};
