/**
 * @author thucvv
 */

export function setCurrency(currency) {
  return { type: "SET_CURRENCY", currency };
}

export function resetCurrencyState() {
  return { type: "RESET_CURRENCY_STATE" };
}

export function setMsgSuccessCurrency(success) {
  return { type: "SET_MSG_SUCCESS_CURRENCY", success };
}

export function setMsgErrorCurrency(error) {
  return { type: "SET_MSG_ERROR_CURRENCY", error };
}
export function init() {
  return { type: "INIT_STATE" };
}
