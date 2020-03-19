/**
 * @author thucvv
 */

const revenueReducer = (
  state = {
    msg: {
      success: { code: "", message: "" },
      error: { code: "", message: "" }
    },
    revenueDetail: {
      totalPage: 7,
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      totalBill: 0,
      bill: [],
      detail: []
    },
    revenue: {
      labels: [],
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_REVENUE":
      return Object.assign({}, state, {
        revenue: action.revenues
      });
    case "SET_MSG_SUCCESS_REVENUE":
      return Object.assign({}, state, {
        msg: { ...state.msg, success: action.success }
      });
    case "SET_MSG_ERROR_REVENUE":
      return Object.assign({}, state, {
        msg: { ...state.msg, error: action.error }
      });
    case "RESET_REVENUE_STATE":
      return Object.assign({}, state, {
        revenue: ""
      });
    // ------ Set Detail Revenues ---------
    case "SET_DETAIL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: { ...state.revenueDetail, detail: action.detail }
      });
    case "SET_BILL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: { ...state.revenueDetail, bill: action.bill }
      });
    case "SET_TOTAL_BILL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: { ...state.revenueDetail, totalBill: action.total }
      });
    case "SET_TOTAL_PAGE_DETAIL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: { ...state.revenueDetail, totalPage: action.totalPage }
      });
    case "SET_MSG_SUCCESS_DETAIL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: {
          ...state.revenueDetail,
          msg: { ...state.revenueDetail.msg, success: action.success }
        }
      });
    case "SET_MSG_ERROR_DETAIL_REVENUE":
      return Object.assign({}, state, {
        revenueDetail: {
          ...state.revenueDetail,
          msg: { ...state.revenueDetail.msg, error: action.error }
        }
      });
    default:
      return state;
  }
};

export default revenueReducer;
