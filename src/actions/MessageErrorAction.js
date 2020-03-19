/**
 * @author caott
 */

function setErrorCode(errorCodes) {
  return { type: "ERROR_CODE", errorCodes };
}

function setMsgError(msgError) {
  return { type: "MSG_ERROR", msgError };
}

function clearMsgError() {
  return { type: "CLEAR_ERROR" };
}
const messageAction = {
  setErrorCode,
  setMsgError,
  clearMsgError
};

export default messageAction;
