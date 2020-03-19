/**
 * @author thucvv
 */
import { setErrorLogout, resetLoginState } from "../actions/LoginAction";
import i18n from "../views/components/I18n";
import stringUtils from "./StringUtils";

function errorCode(error, errorAction, dispatch) {
  if (error.response) {
    let { code, field } = error.response.data.errors[0];
    // let message = error.response.data.errors[0].message;
    switch (error.response.status) {
      case 400:
        switch (code) {
          case "E40001":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40002":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40004":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40007": {
            if (
              !stringUtils.isEmpty(field) &&
              field.split("_")[0] === "member" &&
              field.split("_")[1] === "code"
            ) {
              dispatch(
                errorAction({
                  code,
                  message: i18n
                    .t("bonus.user_bonus_not_exist")
                    .replace(
                      "[user]",
                      `${i18n.t("layout_common.number")} ${Number(
                        field.split("_")[2]
                      )}`
                    )
                })
              );
            } else {
              dispatch(
                errorAction({ code, message: i18n.t("msg_error." + code) })
              );
            }
            // dispatch(
            //   errorAction({ code, message: i18n.t("msg_error." + code) })
            // );
            break;
          }

          case "E40011":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40017":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40018":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40028":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40031": {
            if (!stringUtils.isEmpty(field) && field === "code") {
              dispatch(
                errorAction({
                  code,
                  message: i18n
                    .t("msg_error." + code)
                    .replace("[field]", i18n.t("bill.code"))
                })
              );
            } else {
              dispatch(
                errorAction({ code, message: i18n.t("msg_error." + code) })
              );
            }

            break;
          }
          case "E40032":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          case "E40035":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;

          default:
            dispatch(
              errorAction({
                code: "E400",
                message: i18n.t(`msg_error.E400`)
              })
            );
            break;
        }
        break;
      case 401:
        switch (code) {
          case "E40101":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({ code: "E401", message: i18n.t("msg_error.E401") })
            );
            break;
        }
        break;
      case 403:
        switch (code) {
          case "E40301":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );

            // if this error occur, you need re_new token ----------------------------------------------------

            //dispatch(loginSuccess(false));
            // dispatch(resetLoginState());
            //localStorage.setItem("token", "");
            // loginService.autoLogin(localStorage.getItem("token"), dispatch);
            break;
          default:
            dispatch(
              errorAction({ code: "E403", message: i18n.t("msg_error.E403") })
            );
            break;
        }
        break;
      case 404:
        switch (code) {
          case "E40401":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({ code: "E404", message: i18n.t("msg_error.E404") })
            );
            break;
        }
        break;
      case 405:
        switch (code) {
          case "E40501":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({ code: "E405", message: i18n.t("msg_error.E405") })
            );
            break;
        }
        break;
      case 408:
        switch (code) {
          case "E40801":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({ code: "E408", message: i18n.t("msg_error.E408") })
            );
            break;
        }
        break;
      case 409:
        switch (code) {
          case "E40901":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            dispatch(resetLoginState());
            localStorage.setItem("token", "");
            localStorage.setItem("xKey", "");
            break;
          default:
            dispatch(
              errorAction({ code: "E409", message: i18n.t("msg_error.E409") })
            );
            break;
        }
        break;
      case 500:
        switch (code) {
          case "E50001":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({
                code: "E500",
                message: i18n.t("msg_error.E500")
              })
            );
            break;
        }
        break;

      case 509:
        switch (code) {
          case "E50901":
            dispatch(
              errorAction({ code, message: i18n.t("msg_error." + code) })
            );
            break;
          default:
            dispatch(
              errorAction({ code: "E509", message: i18n.t("msg_error.E509") })
            );
            break;
        }
        break;
      default:
        dispatch(
          errorAction({ code: "E000", message: i18n.t("msg_error.E000") })
        );
        break;
    }
  } else if (error.request) {
    dispatch(errorAction({ code: "E001", message: i18n.t("msg_error.E001") }));
  } else {
    dispatch(errorAction({ code: "E000", message: i18n.t("msg_error.E000") }));
  }
}

/**
 * errorLogin
 */

export function errorLogin(error, updateError, dispatch) {
  errorCode(error, updateError, dispatch);
}

function err(error, errAction, dispatch) {
  dispatch(errAction({ code: "test", message: error }));
}
export function errorTest(error, updateError, dispatch) {
  err(error, updateError, dispatch);
}

export function errorLogOut(error, dispatch) {
  errorCode(error, setErrorLogout, dispatch);
}

/**
 * error  Product
 */
export function errorGetProduct(error, setError, dispatch) {
  errorCode(error, setError, dispatch);
}

export function errorAddProduct(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errorUpdateProduct(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errorDeleteProduct(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// import file -------------
export function errorImportFile(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errorImportListFileData(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// export qr list ---------
export function errGetDataExport(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// transaction ----------------------
export function errGetTransaction(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errGetTransDetails(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// revenue
export function errGetRevenue(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errGetRevenueDetails(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// currency ----------------------
export function errGetCurrency(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// ---- get Bill Details ---------------
export function errGetBillDetails(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

//manager users
export function errGetUsers(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}
// ---
export function errGetUserAdmin(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

export function errUpdateRoleUsers(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}

// bonus point user
export function errBonus(error, errorAction, dispatch) {
  errorCode(error, errorAction, dispatch);
}
