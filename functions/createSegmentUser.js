const Analytics = require("analytics-node");

const identify = (analytics, params) => {
  return new Promise((resolve, reject) => {
    analytics.identify(params, (err, res) => {
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
  const analytics = new Analytics(context.SEGMENT_WRITE_KEY);

  const { phone, email } = event;

  const firstName = "Mary";
  const lastName = "Joe";
  const salutation = "Mrs";
  const memberId = `OWS${phone.slice(-4)}`;

  const data = {
    userId: memberId,
    phone,
    traits: {
      name: `${firstName} ${lastName}`,
      email,
      "First Name": firstName,
      "Last Name": lastName,
      accountType: "A-list",
      userId: memberId,
      createdAt: new Date(),
      mobileno: phone,
      phoneNumber: phone,
      customerInfo: {
        addresses: [
          {
            addressType: "permanent",
            city: "S. Lakeline Blvd",
            country: "Michigan",
            zipCode: "49507",
            state: "Grand Rapids",
            street: "Owl Shoes 700",
          },
        ],
        email,
        firstName: firstName,
        lastName: lastName,
        mobileno: phone,
        salutation,
      },
    },
  };

  console.log(phone);

  try {
    await identify(analytics, data);
    return callback(null, sendResponse({ status: "success" }));
  } catch (error) {
    return callback(null, sendResponse({ status: "failed", error }, 400));
  }
};
