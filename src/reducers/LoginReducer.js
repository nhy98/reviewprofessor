
const loginReducer = (
  state = {
    loginSuccess: false,
    error: "",
    errorLogout: "",
    token: "",
    xKey: ""
  },
  action
) => {
  switch (action.type) {
    case "IS_LOGIN_SUCCESS":
      return Object.assign({}, state, {
        loginSuccess: action.success
      });
    case "UPDATE_ERROR":
      return Object.assign({}, state, {
        error: action.error
      });
    case "SET_TOKEN":
      return Object.assign({}, state, {
        token: action.token
      });
    case "SET_XKEY":
      return Object.assign({}, state, {
        xKey: action.xKey
      });
    case "SET_ERROR_LOG_OUT":
      return Object.assign({}, state, {
        errorLogout: action.error
      });
    case "RESET_LOGIN_STATE":
      return Object.assign({}, state, {
        loginSuccess: false,
        error: "",
        errorLogout: "",
        token: "",
        xKey: ""
      });
    default:
      return state;
  }
};

export default loginReducer;
