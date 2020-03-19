/**
 * @author thucvv
 */
export function loginSuccess(success) {
  return { type: "IS_LOGIN_SUCCESS", success };
}

export function updateError(error) {
  return { type: "UPDATE_ERROR", error };
}

export function setToken(token) {
  return { type: "SET_TOKEN", token };
}

export function setXKey(xKey) {
  return { type: "SET_XKEY", xKey };
}

export function resetLoginState() {
  return { type: "RESET_LOGIN_STATE" };
}

export function setErrorLogout(error) {
  return { type: "SET_ERROR_LOG_OUT", error };
}
