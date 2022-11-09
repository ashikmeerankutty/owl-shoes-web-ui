const sgMail = require("@sendgrid/mail");
const Analytics = require("analytics-node");

const track = (analytics, params) => {
  return new Promise((resolve, reject) => {
    analytics.track(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const sendResponse = (data, status = 200) => {
  const response = new Twilio.Response();
  response.setStatusCode(status);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
};

exports.handler = async function (context, event, callback) {
  sgMail.setApiKey(context.SENDGRID_API_KEY);
  const analytics = new Analytics(context.SEGMENT_WRITE_KEY);

  const { email, phone } = event;

  const memberId = `OWS${phone.slice(-4)}`;

  const msg = {
    to: email,
    from: context.SENDGRID_FROM_EMAIL,
    templateId: context.SENDGRID_TEMPLATE_ID,
    dynamicTemplateData: {
      promoWebsiteUrl: `${context.WEBSITE_URL}?memberId=${memberId}&phone=${phone}&email=${email}`
    }
  };

  try {
    await sgMail.send(msg);
    await track(analytics, {
      userId: memberId,
      phone,
      event: "Promotional Email Sent",
      properties: {
        emailSendAt: new Date(),
      },
    });
    return callback(null, sendResponse({ status: "success" }));
  } catch(e) {
    return callback(null, sendResponse({ status: "failed", e }, 400));
  }
};
