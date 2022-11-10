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
    sfdcSecurityToken,
    sendgridApiKey,
    sendgridFromEmail,
    sendgridTemplateId,
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

  if (!sendgridApiKey) {
    throw "Please provide a valid `sendgridApiKey`";
  }

  if (!sendgridFromEmail) {
    throw "Please provide a valid `sendgridFromEmail`";
  }

  if (!sendgridTemplateId) {
    throw "Please provide a valid `sendgridTemplateId`";
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
    sfdcSecurityToken,
    sendgridApiKey,
    sendgridFromEmail,
    sendgridTemplateId,
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
    sfdcSecurityToken,
    sendgridApiKey,
    sendgridFromEmail,
    sendgridTemplateId,
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
    .replace(/(?<=YOUR_SFDC_SECURITY_TOKEN=)(\w*)/gm, sfdcSecurityToken)
    .replace(/(?<=YOUR_SENDGRID_API_KEY=)(\w*)/gm, sendgridApiKey)
    .replace(/(?<=YOUR_SENDGRID_FROM_EMAIL=)(\w*)/gm, sendgridFromEmail)
    .replace(/(?<=YOUR_SENDGRID_TEMPLATE_ID=)(\w*)/gm, sendgridTemplateId);

  fs.writeFileSync(".env", envFileContent);

  console.log("✅  Project bootstrapped");
} catch (e) {
  console.error(`❌  Bootstrap script aborted: ${e}`);
}
