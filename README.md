# Money Button: Posts - Paywall Example
Example application showing how to build a paywall using [Money Button](https://moneybutton.com).

## Index
* `api`: [Express.js](https://expressjs.com/) app which implements the test's backend including payment webhook handling.
* `web`: [React.js](https://reactjs.org/) app which implements the test's frontend including a paywall.

## Instalation
Install node modules (`npm install`) for both: `api` and `web` packages.

### Create `.env` file for `api`.
```
# api/.env
PORT=[PORT]
WEBHOOK_SECRET=[WEBHOOK_SECRET]
```
* `PORT`: Express application port.
* `WEBHOOK_SECRET`: Money Button app webhook secret, can be found on the [applications setings page](https://www.moneybutton.com/settings/apps).

### Create `.env` file for `web`.
```
# web/.env
REACT_APP_API_URL=[REACT_APP_API_URL]
REACT_APP_CLIENT_IDENTIFIER=[REACT_APP_CLIENT_IDENTIFIER]
REACT_APP_OAUTH_CLIENT_IDENTIFIER=[REACT_APP_OAUTH_CLIENT_IDENTIFIER]
```
* `REACT_APP_API_URL`: Express application base url including the port (e.g. http://localhost:4000).
* `REACT_APP_CLIENT_IDENTIFIER`: Money Button app client identifier, can be found on the [applications setings page](https://www.moneybutton.com/settings/apps).
* `REACT_APP_CLIENT_IDENTIFIER`: Money Button app oauth client identifier, can be found on the [applications setings page](https://www.moneybutton.com/settings/apps).

## Start
You can use `npm start` for both `api` and `web`. 
