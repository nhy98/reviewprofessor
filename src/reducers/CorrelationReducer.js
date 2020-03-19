/**
 * @author thucvv
 */

const correlationReducer = (
  state = {
    correlation: {
      labels: [],
      data: [],
      colors: []
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_CORRELATION":
      return Object.assign({}, state, {
        correlation: action.correlation
      });
    case "RESET_CORRELATION_STATE":
      return Object.assign({}, state, {
        correlation: ""
      });
    case "INIT_STATE":
      return Object.assign({}, state, {
        correlation: {
          labels: action.labels,
          data: action.data,
          colors: action.colors
        }
      });
    default:
      return state;
  }
};

export default correlationReducer;
