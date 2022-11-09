const axios = require("axios");
exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  const spaceId = context.SEGMENT_SPACE_ID;
  const phone = event.phone?.replace("+", "%2B");
  const url = `https://profiles.segment.com/v1/spaces/${spaceId}/collections/users/profiles/mobileno:${phone}/traits`;

  const uname = context.SEGMENT_ACCESS_SECRET;

  try {
    const res = await axios({
      method: "get",
      url: url,
      auth: {
        username: uname,
      },
      params: {
        limit: 100,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    response.setStatusCode(200);
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    response.appendHeader("Content-Type", "application/json");
    response.setBody(res.data);

    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
    return callback(null, response);
  } catch (e) {
    response.setBody("Authorization failed");
    response.setStatusCode(403);
    return callback(null, response);
  }
};
