export function setReviewData(data) {
    return { type: "SET_REVIEW_DATA", data };
  }
  export function setFlag(data) {
    return { type: "SET_FLAG_DATA", data };
  }
  export function setMsgSuccessGetUser(success) {
    return { type: "SET_MSG_SUCCESS_GET_USER", success };
  }
  
  export function setMsgErrorGetUser(error) {
    return { type: "SET_MSG_ERROR_GET_USER", error };
  }
  
 