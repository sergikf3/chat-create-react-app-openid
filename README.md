# WebFlux Chat Application integrated with redux-oidc module and bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

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
npm install --save moment
npm install --save npm-run-all
npm install --save prop-types

npm install
```
## Complete creation of the application services and components

Modify the package.json file using the following parameter values:

```
  "proxy": {
    "/websocket/chat": {
      "target": "ws://127.0.0.1:8080",
      "ws": true
    }
  },
  "scripts": {
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build-js": "react-scripts build",
    "build": "npm-run-all build-css build-js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive"
  }
  ```
 
 Add the following script to the body tag of the src/public/index.html file:
 
  ```
 <script
    src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
    crossorigin="anonymous"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 ```
 Add the following link to the head tag of the same file:
 
 ```
    <link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css">
 ```
 
 Create the ./.babelrc file:
 
 ```
{
  "presets": ["es2015", "react", "stage-1"],
  "plugins": ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties', 'react-hot-loader/babel']
}
 ```
 
 Create the ./.jshintrc file
 
  ```
{
  "esversion": 6
}
 ```
 
  Create the ./.eslintrc.yml file
 
  ```
---
  extends:
    - plugin:react/recommended

  env:
    browser: true
    node: true
    es6: true

  parserOptions:
   ecmaVersion: 6
   sourceType: "module"
   ecmaFeatures:
    jsx: true

  globals:
    __DEV__: true
    __SERVER__: true

  plugins:
    - react

  rules:
    react/jsx-uses-vars: 1
    react/prop-types: [1, { ignore: [children] }]

    semi: 0
    key-spacing: 1
    curly: 0
    consistent-return: 0
    space-infix-ops: 1
    camelcase: 0
    no-spaced-func: 1
    no-alert: 1
    eol-last: 1
    comma-spacing: 1
    eqeqeq: 1

    # possible errors
    comma-dangle: 0
    no-cond-assign: 2
    no-console: 0
    no-constant-condition: 2
    no-control-regex: 2
    no-debugger: 2
    no-dupe-args: 2
    no-dupe-keys: 2
    no-duplicate-case: 2
    no-empty-character-class: 2
    no-empty: 2
    no-ex-assign: 2
    no-extra-boolean-cast: 2
    no-extra-parens: 0
    no-extra-semi: 2
    no-func-assign: 2
    no-inner-declarations: 2
    no-invalid-regexp: 2
    no-irregular-whitespace: 2
    no-negated-in-lhs: 2
    no-obj-calls: 2
    no-regex-spaces: 2
    no-sparse-arrays: 2
    no-unexpected-multiline: 2
    no-unreachable: 2
    use-isnan: 2
    valid-jsdoc: 2
    valid-typeof: 2

    no-redeclare: 2

    init-declarations: 2
    no-catch-shadow: 2
    no-delete-var: 2
    no-label-var: 2
    no-shadow-restricted-names: 2
    no-shadow: 2
    no-undef-init: 2
    no-undef: 2
    no-undefined: 2
    no-unused-vars: 2
    no-use-before-define: 2
 ```

Create the ./.editorconfig file
 
```
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true


# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,jsx,html,sass}]
charset = utf-8
indent_style = tab
indent_size = 2
trim_trailing_whitespace = true
 ```
 
Create the ./.env.development file
 
```
PORT=8888
 ```
 
 

