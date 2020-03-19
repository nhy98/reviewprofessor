import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./stores/store";

var dotenv = require("dotenv");
// There's no need to check if .env exists, dotenv will check this // for you. It will show a small warning which can be disabled when // using this in production.

dotenv.load();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
