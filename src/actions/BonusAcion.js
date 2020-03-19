/**
 * @author thucvv
 */

export function setBonusUser(users) {
  return { type: "SET_USER_BONUS", users };
}

export function resetBonusUser() {
  return { type: "RESET_USER_BONUS" };
}

export function removeUserBonus(index) {
  return { type: "REMOVE_USER_BONUS", index };
}

export function addAUserBonus(user) {
  return { type: "ADD_A_USER_BONUS", user };
}

export function setMsgSuccessBonusUser(success) {
  return { type: "SET_MSG_SUCCESS_BONUS_USER", success };
}

export function setMsgErrorBonusUser(error) {
  return { type: "SET_MSG_ERROR_BONUS_USER", error };
}

export function setUserSearchBonus(data) {
  return { type: "SET_USER_SEARCH_BONUS", data };
}

export function setMsgSuccessSearchBonusUser(success) {
  return { type: "SET_MSG_SUCCESS_SEARCH_USER_BONUS", success };
}

export function setMsgErrorSearchBonusUser(error) {
  return { type: "SET_MSG_ERROR_SEARCH_USER_BONUS", error };
}

// import ------------------
export function setDataImportBonus(data) {
  return { type: "SET_DATA_IMPORT_BONUS", data };
}

export function resetDataImportBonus() {
  return { type: "RESET_DATA_IMPORT_BONUS" };
}

export function setTotalPageDataImportBonus(total) {
  return { type: "SET_TOTAL_PAGE_DATA_IMPORT_BONUS", total };
}

export function setMsgSuccessDataImportBonus(success) {
  return { type: "SET_MSG_SUCCESS_DATA_IMPORT_BONUS", success };
}

export function setMsgErrorDataImportBonus(error) {
  return { type: "SET_MSG_ERROR_DATA_IMPORT_BONUS", error };
}

// list bonus ------------------
export function setListBonus(data) {
  return { type:"SEARCH_BONUS_PRO", data};
}

export function setBonusDetail(data) {
  return { type: "SERCH_BONUS_DETAIL", data};
}

export function setPopupApproved(data) {
  return { type: "SHOW_POPUP_APPROVED", data};
}

export function setPopupBonusDetail(data) {
  return { type: "SHOW_POPUP_BONUS_DETAIL", data};
}