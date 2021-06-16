# Money Button: Posts - Paywall Example
Example application showing how to build a paywall using [Money Button](https://moneybutton.com).

## Overview
This example includes two parts:

* `api`: [Express.js](https://expressjs.com/) app which implements the test's backend including payment webhook handling.
* `web`: [React.js](https://reactjs.org/) app which implements the frontend with a paywall.

## Installation
Install node modules for the interface and the backend:

```sh
cd api && npm install
cd web && npm install
```

## Configuration
1. Create an Application in your [Money Button account]((https://www.moneybutton.com/settings/apps))

2. In your app's settings page, configure your _Webhook URL_ to your app's server (if you want to run this example locally, use a tool like [ngrok](https://ngrok.com/) to forward webhook requests to your localhost)

2. Create a `.env` file with the following parameters from the created application:

```
WEBHOOK_SECRET=[WEBHOOK_SECRET]
REACT_APP_CLIENT_IDENTIFIER=[REACT_APP_CLIENT_IDENTIFIER]
REACT_APP_OAUTH_CLIENT_IDENTIFIER=[REACT_APP_OAUTH_CLIENT_IDENTIFIER]
```

## Start
Start both projects:

```sh
cd api && npm run start
cd web && npm run start
```

For more information, visit our [Money Button official documentation](https://docs.moneybutton.com)
