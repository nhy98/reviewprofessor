/**
 * @author caott
 */
import axios from "axios";
import msgErrorAction from "../actions/MessageErrorAction";
import loadingAction from "../actions/LoadingAction";
import Api from "./Api";
import { setToken, setXKey } from "../actions/LoginAction";
import stringUtils from "./StringUtils";

export function invokerApi(
  url,
  method,
  requestBody,
  functionName,
  key,
  dispatch,
) {
  // console.log(">>>>>>>Tx >| " + method + ":" + url);
  // console.log(">>>>>>>Tx >| " + "data:" + data);
  let errorCodes = [];

  axios({
    method: method,
    url: url,
    data: requestBody 
  })
    .then(response => {
      console.log("<<<<<<<<Rx |< RESPONSE");
      // console.log(response);
      dispatch(loadingAction.setLoadingPopup(false));
      if (response.status === 200 || response.status === 201) {
        if (key !== null) {
          // let dataEncryt = response.data.data;
          // let dataDecrypt = aes.decrypt(dataEncryt, key);
          functionName(response, dispatch, key);
        } else {
          functionName(response, dispatch);
        }
      } else if (response.status === 204) {
        console.log("no content");
        functionName(null, dispatch);
      }
      console.log("=======END===========");
    })
    .catch(error => {
      console.log("Exception: " + error.message);
      // dispatch(loadingAction.setLoadingPopup(false));
      if (error.response) {
        let status = error.response.status;
        switch (status) {
          case 500:
            errorCodes.push("E500");
            break;
          case 409:
            errorCodes.push("E40901");
            localStorage.setItem("token", "");
            localStorage.setItem("xKey", "");
            break;
          case 408:
            errorCodes.push("E408");
            break;
          case 405:
            errorCodes.push("E405");
            break;
          case 404:
            errorCodes.push("E404");
            break;

          case 401:
            errorCodes.push("E401");
            break;
          case 400: {
            const { code, field } = error.response.data.errors[0];
            switch (code) {
              case "E40007": {
                if (!stringUtils.isEmpty(field) && field === "username") {
                  errorCodes.push("E_user_not_exist");
                } else errorCodes.push(code);
                break;
              }
              default:
                errorCodes.push(code);
                break;
            }
            break;
          }

          default:
            break;
        }
        dispatch(msgErrorAction.setErrorCode(errorCodes));
        console.log(errorCodes);
        console.log("=======END===========");
      } else if (error.request) {
        dispatch(msgErrorAction.setMsgError(errorCodes));
      } else {
        errorCodes.push("The system is busy!");
        dispatch(msgErrorAction.setMsgError(errorCodes));
      }
    });
}

export function autoLogin(
  url,
  method,
  requestBody,
  functionName,
  key,
  dispatch
) {
  let token = localStorage.getItem("token");
  console.log("token request ===============");
  console.log(token);
  let errorCodes = [];
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
        const xKey = response.headers.x_key;
        console.log("RenewToken : token->" + token);
        console.log("RenewToken : xkey->" + xKey);
        if (token && xKey) {
          localStorage.setItem("token", token);
          localStorage.getItem("token");
          localStorage.setItem("xKey", xKey);
          localStorage.getItem("xKey");
          dispatch(setToken(token));
          dispatch(setXKey(xKey));
          // dispatch(loginSuccess(true));
          // intercepterToken(token);
          this.setInterceptor = axios.interceptors.request.use(
            config => {
              config.headers.Authorization = localStorage.getItem("token");
              return config;
            },
            error => {
              Promise.reject(error);
            }
          );
          invokerApi(
            url,
            method,
            requestBody,
            functionName,
            key,
            dispatch,
            true
          );
        } else {
          errorCodes.push("E403");
          // localStorage.setItem("token", "");
          // localStorage.setItem("xKey", "");
        }
      }
    })
    .catch(error => {
      // errorLogin(error, updateError, dispatch);
      // dispatch(resetLoginState());
      errorCodes.push("E403");
      // localStorage.setItem("token", "");
      // localStorage.setItem("xKey", "");
      localStorage.setItem("autoLogin", 2);
      // dispatch(loginSuccess(false));
      dispatch(msgErrorAction.setMsgError(errorCodes));
    });
  // }
}
