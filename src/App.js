import React, { Component } from "react";
import { Router, HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
// Containers
import { DefaultLayout } from "./containers";
// Pages
import { Login, Register } from "./views/Pages";
import history from "./stores/history";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import { loginSuccess, setXKey, updateError } from "./actions/LoginAction";
import constants from "./utils/Constants";
import stringUtils from "./utils/StringUtils";
import loginService from "./services/LoginService";
import i18n from "./views/components/I18n";

// import { renderRoutes } from "react-router-config";
function PrivateRouter({ loginSuccess, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loginSuccess ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRouter({ loginSuccess, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loginSuccess === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    axios.defaults.headers = {
      Accept : "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const token = localStorage.getItem(constants.TOKEN);
    const authToken = `Bearer ${token}`;
    console.log(authToken+"tokennnnnn");
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = authToken;
        console.log(config+"configggggg");
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => response,
      error => {
        console.log("error interceptor>>> ");
        console.log(error);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 403) {
            const remember = localStorage.getItem(constants.REMEMBER);
            if (remember === "true") {
              loginService.renewToken(dispatch);
            } else {
              localStorage.removeItem(constants.TOKEN);
              localStorage.removeItem(constants.X_KEY);
              localStorage.removeItem(constants.REMEMBER);
              dispatch(loginSuccess(false));
              dispatch(
                updateError({
                  code: "error",
                  message: i18n.t("msg_error.E40301")
                })
              );
              // alert(i18n.t("msg_error.E40301"));
              // return;
            }
          }
          if (status === 409) {
            localStorage.removeItem(constants.TOKEN);
            localStorage.removeItem(constants.X_KEY);
            localStorage.removeItem(constants.REMEMBER);
            dispatch(loginSuccess(false));
            alert("Tài khoản đang được đăng nhập trên thiết bị khác");
            return;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  componentWillMount() {
    // let autologin = localStorage.getItem("autoLogin");
    // if (autologin === 1) {
    //   this.props.dispatch(loginSuccess(true));
    // }
    // console.log("AUTOLOGIN: " + autologin);
    // userService.getUser(xKey, token, dispatch);

    // -----------------------new code ----------------------------
    // const remember = localStorage.getItem(constants.REMEMBER);
    // if(remember === "true"){
    // }

    const { dispatch } = this.props;
    const token = localStorage.getItem(constants.TOKEN);
    const xKey = localStorage.getItem(constants.X_KEY);
    if (!stringUtils.isEmpty(token) && !stringUtils.isEmpty(constants.X_KEY)) {
      // if (window.performance) {
      //   if (performance.navigation.type === 1) {
      //     // alert("This page is reloaded");
      //   } else {
      //     // alert("This page is not reloaded");
      //   }
      // } else {
      // }
      dispatch(loginSuccess(true));
      dispatch(setXKey(xKey));
    } else {
      dispatch(loginSuccess(false));
    }
  }
  render() {
    const { dispatch } = this.props;
    const token = localStorage.getItem(constants.TOKEN);
    const xKey = localStorage.getItem(constants.X_KEY);

    let isLogin = false;
    if (!stringUtils.isEmpty(token) && !stringUtils.isEmpty(constants.X_KEY)) {
      // if (window.performance) {
      //   if (performance.navigation.type === 1) {
      //     // alert("This page is reloaded");
      //   } else {
      //     // alert("This page is not reloaded");
      //   }
      // } else {
      // }
      dispatch(loginSuccess(true));
      dispatch(setXKey(xKey));
      isLogin = true;
    } else {
      dispatch(loginSuccess(false));
    }

    // const { loginSuccess } = this.props;
    console.log("login success == " + isLogin);

    return (
      <Router history={history}>
        <Switch>
          <PublicRouter
            loginSuccess={isLogin}
            path="/login"
            name="Login"
            component={Login}
          />
          <PublicRouter
            loginSuccess={isLogin}
            path="/register"
            name="Register"
            component={Register}
          />
          <PrivateRouter
            loginSuccess={isLogin}
            path="/"
            name="Home"
            component={DefaultLayout}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(state => ({
  loginSuccess: state.LoginReducer.loginSuccess
}))(App);
