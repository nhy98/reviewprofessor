/**
 * @author thucvv
 */
import axios from "axios";
import {
  loginSuccess,
  updateError,
  setToken,
  setXKey,
  resetLoginState
} from "../actions/LoginAction";
import Api from "../utils/Api";
import { errorLogin, errorLogOut } from "../utils/ResponseCode";
import validate from "../utils/validations/Validate";
import { invokerApi } from "../utils/AxiosUtils";
import constants from "../utils/Constants";
import stringUtils from "../utils/StringUtils";

function setErrorLogin(error, dispatch) {
  dispatch(updateError(error));
}

// function login(username, password, isRemember, dispatch) {
//   if (
//     validate.validateStringMaxLength(
//       username,
//       false,
//       50,
//       updateError,
//       dispatch
//     ) &&
//     validate.validateStringMaxLength(password, false, 50, updateError, dispatch)
//   ) {
//     localStorage.setItem(constants.TOKEN, "");
//     axios({
//       method: "POST",
//       url: Api.AUTHORIZE,
//       data: { data: { username, password, isremember: isRemember ? 1 : 0 } }
//     })
//       .then(response => {
//         console.log("========= response login ================== ");
//         console.log(response);
//         if (response.status === 200) {
//           const token = response.headers.authorization;

//           const xKey = response.headers.x_key;
//           if (token !== null && token !== "" && token !== "undefined") {
//             console.log("token and xKey when login ====================== ");
//             console.log(token + "           xKey === " + xKey);

//             localStorage.setItem(constants.TOKEN, token);
//             localStorage.getItem(constants.TOKEN);
//             localStorage.setItem(constants.X_KEY, xKey);
//             localStorage.getItem(constants.X_KEY);
//             dispatch(setToken(token));
//             // intercepterToken(token);

//             this.setInterceptor = axios.interceptors.request.use(
//               config => {
//                 config.headers.Authorization = localStorage.getItem(constants.TOKEN);
//                 return config;
//               },
//               error => {
//                 Promise.reject(error);
//               }
//             );
//             dispatch(setXKey(xKey));
//             dispatch(loginSuccess(true));
//           }
//         }
//       })
//       .catch(error => {
//         console.log("error login ============");
//         console.log(error);

//         localStorage.setItem(constants.TOKEN, "");
//         localStorage.setItem(constants.X_KEY, "");
//         dispatch(loginSuccess(false));
//         errorLogin(error, updateError, dispatch);
//       });
//   }
// }

function loginHandle(username, password, isRemember, dispatch) {
  if (
    validate.validateStringMaxLength(
      username,
      false,
      50,
      updateError,
      dispatch
    ) &&
    validate.validateStringMaxLength(password, false, 50, updateError, dispatch)
  ) {
    let url = Api.AUTHORIZE;
    let data = `username=${username}&password=${password}`;
    invokerApi(url, "POST", data, responseLogin, null, dispatch);
  }
  //, isremember: isRemember ? 1 : 0
}

function responseLogin(response, dispatch) {
  const { authToken } = response.data;

  console.log("responseLogin : token->" + authToken);
  console.log(response);

  if (authToken) {
    localStorage.setItem(constants.TOKEN, authToken);
    localStorage.getItem(constants.TOKEN);
    localStorage.setItem("userId", response.data.data.mbsUser.userId);
    localStorage.setItem("user", response.data.data.mbsUser.username);
    switch (response.data.data.mbsUser.role) {
      case 1:
        localStorage.setItem("role", 1);
        break;
      case 2:
        localStorage.setItem("role", 2);
        break;
    }
    let autoLogin = localStorage.getItem("autoLogin");
    if (autoLogin === 0) {
      localStorage.setItem("autoLogin", 1);
      localStorage.getItem("autoLogin");
    }
    dispatch(setToken(authToken));
    dispatch(loginSuccess(true));
    // intercepterToken(token);
    // this.setInterceptor = axios.interceptors.request.use(
    //   config => {
    //     config.headers.Authorization = localStorage.getItem(constants.TOKEN);
    //     return config;
    //   },
    //   error => {
    //     Promise.reject(error);
    //   }
    // );
  }
  else{
    console.log("error login");
    console.log(response.data.message);
  }
}

function intercepterToken(token) {
  console.log("intercepter token ====================== ");
  console.log(token);

  const instance = axios.create();
  this.setInterceptor = instance.interceptors.request.use(
    config => {
      config.headers.Authorization = token;
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
}

function autoLogin(token, dispatch) {
  console.log("token request ===============");
  console.log(token);

  // if (token !== null && token !== "" && token !== "undefined") {
  axios({
    method: "GET",
    url: Api.RENEW_TOKEN,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      if (response.status === 200) {
        const token = response.headers.authorization;
        console.log("token reponse=== " + token);

        const xKey = response.headers.x_key;
        if (token !== null && token !== "" && token !== "undefined") {
          localStorage.setItem(constants.TOKEN, token);
          localStorage.setItem(constants.X_KEY, xKey);
          dispatch(setToken(token));
          intercepterToken(token);
          // this.setInterceptor = axios.interceptors.request.use(
          //   config => {
          //     config.headers.Authorization = token;
          //     return config;
          //   },
          //   error => {
          //     Promise.reject(error);
          //   }
          // );
          dispatch(setXKey(xKey));
          dispatch(loginSuccess(true));
        }
      }
    })
    .catch(error => {
      // errorLogin(error, updateError, dispatch);
      dispatch(resetLoginState());
      // localStorage.setItem(constants.TOKEN, "");
      localStorage.removeItem(constants.TOKEN);
      // localStorage.setItem(constants.X_KEY, "");
      localStorage.removeItem(constants.X_KEY);
      dispatch(loginSuccess(false));
    });
  // }
}

function renewToken(dispatch) {
  axios({
    method: "GET",
    url: Api.RENEW_TOKEN
  })
    .then(response => {
      if (response.status === 200) {
        const token = response.headers.authorization;
        console.log("token reponse=== " + token);

        const xKey = response.headers.x_key;
        if (!stringUtils.isEmpty(token)) {
          localStorage.setItem(constants.TOKEN, token);
          localStorage.setItem(constants.X_KEY, xKey);
          dispatch(setToken(token));
          dispatch(setXKey(xKey));
          dispatch(loginSuccess(true));
        }
      }
    })
    .catch(error => {
      // errorLogin(error, updateError, dispatch);
      dispatch(resetLoginState());
      // localStorage.setItem(constants.TOKEN, "");
      localStorage.removeItem(constants.TOKEN);
      // localStorage.setItem(constants.X_KEY, "");
      localStorage.removeItem(constants.X_KEY);
      localStorage.removeItem(constants.REMEMBER);
      dispatch(loginSuccess(false));
    });
}

function logout(dispatch) {
  // console.log("call logout service ===================");
  // console.log("========= error logout before catch -===============");

  axios({
    method: "GET",
    url: Api.LOG_OUT
  })
    .then(response => {
      console.log("response logout =========== ");
      console.log(response);
      localStorage.removeItem(constants.TOKEN);
      localStorage.removeItem(constants.X_KEY);
      dispatch(loginSuccess(false));
      dispatch(resetLoginState());
      if (response.status === 200) {
        // localStorage.setItem(constants.TOKEN, "");
        // localStorage.setItem(constants.X_KEY, "");
        // dispatch(loginSuccess(false));
        // dispatch(resetLoginState());
        // axios.interceptors.request.eject(this.setInterceptor);
      }
    })
    .catch(error => {
      console.log("error logout ");
      // localStorage.setItem(constants.TOKEN, "");

      localStorage.removeItem(constants.TOKEN);
      localStorage.removeItem(constants.X_KEY);
      dispatch(loginSuccess(false));
      dispatch(resetLoginState());
      // // localStorage.setItem(constants.X_KEY, "");
      // dispatch(loginSuccess(false));
      // console.log(error);
      // errorLogOut(error, dispatch);
    });
}
const loginService = {
  // login,
  logout,
  setErrorLogin,
  autoLogin,
  intercepterToken,
  loginHandle,
  renewToken
};

export default loginService;
