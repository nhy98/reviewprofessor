/**
 *
 * @author thucvv
 */
export function setUserData(data) {
  return { type: "SET_USER_DATA", data };
}
export function resetUserData() {
  return { type: "RESET_USER_DATA" };
}
export function setTotalPageUser(totalPage) {
  return { type: "SET_TOTAL_PAGE_USER", totalPage };
}

export function setMsgSuccessGetUser(success) {
  return { type: "SET_MSG_SUCCESS_GET_USER", success };
}

export function setMsgErrorGetUser(error) {
  return { type: "SET_MSG_ERROR_GET_USER", error };
}

export function setMsgSuccessUpdateUser(success) {
  return { type: "SET_MSG_SUCCESS_UPDATE_USER", success };
}

export function setMsgErrorUpdateUser(error) {
  return { type: "SET_MSG_ERROR_UPDATE_USER", error };
}

// user admin
export function setUserAdmin(data) {
  return { type: "SET_USER_ADMIN", data };
}
//set role 
export function setRole(data) {
  return { type: "SET_USER_ROLE", data };
}

export function setMsgSuccessUserAdmin(success) {
  return { type: "SET_MSG_SUCCESS_USER_ADMIN", success };
}

export function setMsgErrorUserAdmin(error) {
  return { type: "SET_MSG_ERROR_USER_ADMIN", error };
}
