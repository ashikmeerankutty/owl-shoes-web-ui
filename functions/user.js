const jsForce = require("jsforce");

const sendResponse = (data, status = 200) => {
    const response = new Twilio.Response();
    response.setStatusCode(status);
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    response.appendHeader("Content-Type", "application/json");
    response.setBody(data);
    return response;
};

// hardCoding image url as SF its not accessible for public.
const profileImages = [
    "https://www.random-name-generator.com/images/faces/female-white/49.jpg",
    "https://www.random-name-generator.com/images/faces/male-white/03.jpg"
];

exports.handler = function (context, event, callback) {
    const conn = new jsForce.Connection({
        loginUrl: context.SFDC_INSTANCE_URL
    });
    const { userId } = event;

    conn.login(context.SFDC_USER_NAME, `${context.SFDC_PASSWORD}${context.SFDC_SECURITY_TOKEN}`, function (err, res) {
        if (err) {
            return console.error(err);
        }
        conn.query(
            `SELECT id, email, phone, isActive, name, address, aboutMe, fullPhotoUrl, smallPhotoUrl, title FROM User WHERE username = '${userId}'`,
            function (err, res) {
                if (err) {
                    return callback(null, sendResponse("User doesn't exist", 400));
                }
                return callback(
                    null,
                    sendResponse({ ...res.records[0], FullPhotoUrl: profileImages[Math.round(Math.random())] })
                );
            }
        );
    });
};
