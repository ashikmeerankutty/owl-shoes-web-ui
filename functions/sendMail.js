const sgMail = require("@sendgrid/mail");

const sendResponse = (data, status = 200) => {
  const response = new Twilio.Response();
  response.setStatusCode(status);
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
};

exports.handler = function (context, event, callback) {
  sgMail.setApiKey(context.SENDGRID_API_KEY);

  const { email } = event;

  const msg = {
    to: email,
    from: context.SENDGRID_FROM_EMAIL,
    templateId: context.SENDGRID_TEMPLATE_ID,
  };

  sgMail.send(msg).then(
    () => {
      return callback(null, sendResponse({ status: "success" }));
    },
    (error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      return callback(null, sendResponse({ status: "failed", error }, 400));
    }
  );
};
