const TokenValidator = require('twilio-flex-token-validator').functionValidator;

function sendResponse(data) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    response.appendHeader("Content-Type", "application/json");
    response.setBody(data);
    return response;
}

exports.handler =  TokenValidator((context, event, callback) => {
    const { AccessToken } = require("twilio").jwt;
    const { VideoGrant } = AccessToken;

    const { identity, clientIdentity } = event;

    /*
     * Create an access token which we will sign and return to the client,
     * containing the grant we just created
     */
    const token = new AccessToken(context.ACCOUNT_SID, context.TWILIO_API_KEY_SID, context.TWILIO_API_KEY_SECRET, {
        identity
    });

    const clientToken = new AccessToken(context.ACCOUNT_SID, context.TWILIO_API_KEY_SID, context.TWILIO_API_KEY_SECRET, {
        identity: clientIdentity,
    });

    // Grant the access token Twilio Video capabilities
    const grant = new VideoGrant({
        room: event.roomName
    });

    const clientVideoGrant = new VideoGrant({
        room: event.roomName
    });

    token.addGrant(grant);
    clientToken.addGrant(clientVideoGrant);

    // Serialize the token to a JWT string
    return callback(
        null,
        sendResponse({
            token: token.toJwt(),
            clientToken: clientToken.toJwt()
        })
    );
});
