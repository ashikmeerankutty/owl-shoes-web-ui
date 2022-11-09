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
    from: "promotions@em3098.enterprise-twilio.com", // Use the email address or domain you verified above
    templateId: "d-aa7f9e6e9df847a5bbb721b6aff41372",
  };

  sgMail.send(msg).then(
    () => {
      console.log("message send");
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
