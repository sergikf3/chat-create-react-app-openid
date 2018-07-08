# WebFlux Chat Application integrated with redux-oidc module and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

Modified WebFlux Chat Application sample code accompanying [How To Build a Chat App Using WebFlux, WebSockets & React](http://blog.monkey.codes/how-to-build-a-chat-app-using-webflux-websockets-react/) with the ability of the OpenID Connect authentication against Google using the oidc-client-js and redux-oidc modules. The authentication settings must be provided in the chat-create-react-app-openid/src/main/ui/src/utils/configuration.jsx file. 

07-Jul-2018 - Added the new and stale user message display functionality: stale for the logged out user (timestamp blue) and new for the logged in user (timestamp white). 

## Creation of the project baseline using create-react-app:

Make sure that create-react-app is globally installed:

```
npm install -g create-react-app
```
Create the application:

```
create-react-app chat-ui

cd chat-ui

yarn add redux react-redux react-router-dom react-router-redux@next redux-thunk

npm install -save oidc-client@1.3.0
npm install -save redux-oidc@3.0.0-beta.12
npm install -save babel-polyfill
npm install --save node-sass-chokidar

npm install
```
Complete creation of the application services and components