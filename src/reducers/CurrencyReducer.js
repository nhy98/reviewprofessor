/**
 * @author thucvv
 */

const currencyReducer = (
  state = {
    msg: {
      success: { code: "", message: "" },
      error: { code: "", message: "" }
    },
    currency: {
      labels: [], //["January", "February", "March", "April", "May", "June", "July"],
      data: [] //[65, 65, 65, 65, 80, 80, 80]
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return Object.assign({}, state, {
        currency: action.currency
      });
    case "SET_MSG_SUCCESS_CURRENCY":
      return Object.assign({}, state, {
        msg: { ...state.msg, success: action.success }
      });
    case "SET_MSG_ERROR_CURRENCY":
      return Object.assign({}, state, {
        msg: { ...state.msg, error: action.error }
      });
    case "RESET_CURRENCY_STATE":
      return Object.assign({}, state, {
        currency: ""
      });
    default:
      return state;
  }
};

export default currencyReducer;
