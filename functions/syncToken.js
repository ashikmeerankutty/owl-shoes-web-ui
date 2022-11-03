const TokenValidator = require("twilio-flex-token-validator").functionValidator;

function sendResponse(data) {
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    response.appendHeader("Content-Type", "application/json");
    response.setBody(data);
    return response;
}

exports.handler = TokenValidator((context, event, callback) => {
    const { AccessToken } = require("twilio").jwt;
    const { SyncGrant } = AccessToken;

    /*
     * Create an access token which we will sign and return to the client,
     * containing the grant we just created
     */
    const token = new AccessToken(context.ACCOUNT_SID, context.TWILIO_API_KEY_SID, context.TWILIO_API_KEY_SECRET, {
        identity: (Math.random() + 1).toString(36).substring(7)
    });

    // Grant the access token Twilio Video capabilities
    const grant = new SyncGrant({
        serviceSid: context.SYNC_SERVICE_SID
    });

    token.addGrant(grant);
    // Serialize the token to a JWT string
    return callback(
        null,
        sendResponse({
            token: token.toJwt(),
        })
    );
});
