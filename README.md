# OWL Retial Web


_OWL Retail Web_ is an application that demonstrates a website chat widget built for Flex Conversations. It uses Twilio's Conversations JS SDK, Twilio Paste Design library, the Flex WebChats endpoint, Twilio Functions and React.

---

1. [Getting started](#Getting-started)
   1. [Setup Functions](#Setup-functions)
   2. [Setup React App](#Setup-react-app)
   3. [Work locally](#Work-locally)
2. [Deployment](#Deployment)

---

# Getting Started

## Setup Functions

First we need to setup the server to handle token generation for web chat.

### 1. Install Dependencies

```
Node supported version is 14 only.
npm install
```

### 2. Populate Your .env File

We provide a handy `bootstrap` script to set up the environment variables, but you can alternatively copy the `.env.sample` file.

```shell
npm bootstrap \
accountSid=YOUR_ACCOUNT_SID \
authToken=YOUR_AUTH_TOKEN \
apiKey=YOUR_API_KEY_SID \
apiSecret=YOUR_API_SECRET \
addressSid=YOUR_ADDRESS_SID \
conversationsServiceSid=YOUR_CONVERSATIONS_SERVICE_SID \
sfdcInstanceUrl=YOUR_SFDC_INSTANCE_URL \
sfdcUserName=YOUR_SFDC_USER_NAME \
sfdcPassword=YOUR_SFDC_PASSWORD \
sfdcSecurityToken=YOUR_SFDC_SECURITY_TOKEN \
```
You can find your **Account Sid** and **Auth Token** on the main [Twilio Console page](https://console.twilio.com/).

For more info on how to create an **API key** and an **API secret**, please check the [documentation](https://www.twilio.com/docs/glossary/what-is-an-api-key#how-can-i-create-api-keys).

You can find your **Conversations Service Sid** on the [services page](https://console.twilio.com/us1/develop/conversations/manage/services?frameUrl=%2Fconsole%2Fconversations%2Fservices%3Fx-target-region%3Dus1). Make sure to pick the one linked to your Flex Account — usually it is named `Flex Chat Service` and it starts with `IS`

For the Address Sid, Flex Acccount --> Messaging --> Conversations Address --> click on the edit button of your address and the edit screen will contain Address Sid on the column (Address Configuration SID) . Note this Sid starts with `IG`.

## Setup React App

### Checkout React app folder

```
cd assets-src
```

### Install dependencies

```
npm install
```
### Update server port

```
cp .env.sample .env
```

Update the twilio function server url

## Working Locally

From the root folder
### 1. Start the Local Backend Server

```shell
npm run server
```
Your server will be served at http://localhost:3001/.


### 2. Start the Local React App Server

```shell
npm start
```

Your app will be served at http://localhost:3000/.
## Deployment

The project can be deployed as a Twilio Service

### Deploy to twilio serverless

```
npm run deploy
After the flow is created. We need to map the flow to flex task routing. 
```

### Deploy studio flows and update messaging

```
npm run deploy-flows
```

### Update studio workflow and routing based on product user is searched on

```
Refer the run books to configure the agent routing
```

# License

MIT © Twilio Inc.
