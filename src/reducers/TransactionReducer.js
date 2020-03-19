/**
 * @author thucvv
 */

const transactionReducer = (
  state = {
    msg: {
      success: { code: "", message: "" },
      error: { code: "", message: "" }
    },
    transaction: {
      labels: [],
      data: []
    },
    transDetail: {
      totalBill: 0,
      billDetail: [],
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      paging: {
        start: 1,
        end: 4,
        active: 1
      },
      totalPage: 7,
      detailData: []
    }
  },
  action
) => {
  switch (action.type) {
    // ---transaction chart
    case "SET_TRANSACTION":
      return Object.assign({}, state, {
        transaction: action.transaction
      });
    case "SET_MSG_ERROR_TRANSACTION":
      return Object.assign({}, state, {
        msg: { ...state.msg, error: action.error }
      });
    case "SET_MSG_SUCCESS_TRANSACTION":
      return Object.assign({}, state, {
        msg: { ...state.msg, success: action.success }
      });
    case "RESET_TRANSACTION_STATE":
      return Object.assign({}, state, {
        transaction: ""
      });
    // ---------transaction detail -------------
    case "SET_BILL_DETAIL":
      return Object.assign({}, state, {
        transDetail: { ...state.transDetail, billDetail: action.billDetail }
      });
    case "SET_TOTAL_BILL_DETAIL":
      return Object.assign({}, state, {
        transDetail: { ...state.transDetail, totalBill: action.total }
      });
    case "SET_TRANS_DETAIL_DATA":
      return Object.assign({}, state, {
        transDetail: { ...state.transDetail, detailData: action.detailData }
      });
    case "SET_MSG_ERROR_TRANS_DETAIL":
      return Object.assign({}, state, {
        transDetail: {
          ...state.transDetail,
          msg: { ...state.transDetail.msg, error: action.error }
        }
      });
    case "SET_MSG_SUCCESS_TRANS_DETAIL":
      return Object.assign({}, state, {
        transDetail: {
          ...state.transDetail,
          msg: { ...state.transDetail.msg, success: action.success }
        }
      });
    case "RESET_TRANS_DETAIL_STATE":
      return Object.assign({}, state, {
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        },
        detailData: []
      });
    case "SET_PAGE_TOTAL_TRANS_DETAIL":
      return Object.assign({}, state, {
        transDetail: { ...state.transDetail, totalPage: action.totalPage }
      });
    case "SET_NEXT_PAGE_TRANS_DETAIL":
      return Object.assign({}, state, {
        transDetail: {
          ...state.transDetail,
          paging: {
            ...state.transDetail.paging,
            start: action.start,
            end: action.end
          }
        }
      });
    case "SET_ACTIVE_PAGE_TRANS_DETAIL":
      return Object.assign({}, state, {
        transDetail: {
          ...state.transDetail,
          paging: {
            ...state.transDetail.paging,
            active: action.active
          }
        }
      });
    default:
      return state;
  }
};

export default transactionReducer;
