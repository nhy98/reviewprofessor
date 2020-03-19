/**
 * @author caott
 */

const msgError = (
  state = {
    errorCodes: [],
    msgErrors: []
  },
  action
) => {
  switch (action.type) {
    case "ERROR_CODE":
      return Object.assign({}, state, {
        ...state.msgError,
        errorCodes: action.errorCodes
      });
    case "MSG_ERROR":
      return Object.assign({}, state, {
        ...state.errorCodes,
        msgErrors: action.msgError
      });
    case "CLEAR_ERROR":
      return Object.assign({}, state, { errorCodes: [], msgErrors: [] });
    default:
      return state;
  }
};

export default msgError;
