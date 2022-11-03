const fs = require("fs");
const params = process.argv.slice(2);

const getParams = () => {
    const {
        accountSid,
        authToken,
        addressSid,
        apiKey,
        apiSecret,
        conversationsServiceSid,
        sfdcInstanceUrl,
        sfdcUserName,
        sfdcPassword,
        sfdcSecurityToken
    } = params.reduce((acc, arg) => {
        const [, key, val] = arg.match(/(\w*)=(\S*)/) || [];

        if (key) {
            acc[key] = val;
        }

        return acc;
    }, {});

    if (!accountSid) {
        throw "Please provide a valid `accountSid`";
    }
    if (!authToken) {
        throw "Please provide a valid `authToken`";
    }
    if (!apiKey) {
        throw "Please provide a valid `apiKey`. More info at https://www.twilio.com/docs/glossary/what-is-an-api-key#how-can-i-create-api-keys";
    }
    if (!apiSecret) {
        throw "Please provide a valid `apiSecret`. More info https://www.twilio.com/docs/glossary/what-is-an-api-key#how-can-i-create-api-keys";
    }
    if (!addressSid) {
        throw "Please provide a valid `addressSid`";
    }
    if (!conversationsServiceSid) {
        throw "Please provide a valid `conversationsServiceSid`";
    }

    if (!sfdcInstanceUrl) {
        throw "Please provide a valid `sfdcInstanceUrl`";
    }

    if (!sfdcUserName) {
        throw "Please provide a valid `sfdcUserName`";
    }

    if (!sfdcPassword) {
        throw "Please provide a valid `sfdcPassword`";
    }

    if (!sfdcSecurityToken) {
        throw "Please provide a valid `sfdcSecurityToken`";
    }

    return {
        accountSid,
        authToken,
        addressSid,
        apiKey,
        apiSecret,
        conversationsServiceSid,
        sfdcInstanceUrl,
        sfdcUserName,
        sfdcPassword,
        sfdcSecurityToken
    };
};

const getInitialEnvFile = () => {
    try {
        return fs.readFileSync(".env.sample").toString();
    } catch (e) {
        throw "Couldn't read an .env.sample file.";
    }
};
try {
    const {
        accountSid,
        addressSid,
        apiKey,
        apiSecret,
        authToken,
        conversationsServiceSid,
        sfdcInstanceUrl,
        sfdcUserName,
        sfdcPassword,
        sfdcSecurityToken
    } = getParams();

    let envFileContent = getInitialEnvFile()
        .replace(/(?<=ACCOUNT_SID=)(\w*)/gm, accountSid)
        .replace(/(?<=AUTH_TOKEN=)(\w*)/gm, authToken)
        .replace(/(?<=TWILIO_API_KEY_SID=)(\w*)/gm, apiKey)
        .replace(/(?<=TWILIO_API_KEY_SECRET=)(\w*)/gm, apiSecret)
        .replace(/(?<=ADDRESS_SID=)(\w*)/gm, addressSid)
        .replace(/(?<=CONVERSATIONS_SERVICE_SID=)(\w*)/gm, conversationsServiceSid)
        .replace(/(?<=YOUR_SFDC_INSTANCE_URL=)(\w*)/gm, sfdcInstanceUrl)
        .replace(/(?<=YOUR_SFDC_USER_NAME=)(\w*)/gm, sfdcUserName)
        .replace(/(?<=YOUR_SFDC_PASSWORD=)(\w*)/gm, sfdcPassword)
        .replace(/(?<=YOUR_SFDC_SECURITY_TOKEN=)(\w*)/gm, sfdcSecurityToken);

    fs.writeFileSync(".env", envFileContent);

    console.log("✅  Project bootstrapped");
} catch (e) {
    console.error(`❌  Bootstrap script aborted: ${e}`);
}
