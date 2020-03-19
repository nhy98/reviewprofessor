/**
 * @author thucvv
 */

const productReducer = (
  state = {
    paging: {
      start: 1,
      end: 4,
      active: 1
    },
    pagingSearch: {
      start: 1,
      end: 4,
      active: 1
    },
    search: {
      pageSearch: 1,
      errorSearch: "",
      msgSuccess: "",
      products: []
    },
    error: "",
    successGet: "",
    pageTotal: 1,
    isSearch: false,
    products: [],
    update: {
      msgUpdateSuccess: { code: "", message: "" },
      msgUpdateError: { code: "", message: "" }
    },
    delete: {
      msgDeleteSuccess: { code: "", message: "" },
      msgDeleteError: { code: "", message: "" }
    },
    add: {
      msgSuccess: { code: "", message: "" },
      msgError: { code: "", message: "" }
    },
    exportQr: {
      pageTotal: 1,
      msg: {
        msgError: { code: "", message: "" },
        msgSuccess: { code: "", message: "" }
      },
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return Object.assign({}, state, {
        products: action.products
      });
    case "SET_SUCCESS_GET_PRODUCT":
      return Object.assign({}, state, {
        successGet: action.success
      });
    case "SET_PAGING":
      return Object.assign({}, state, {
        paging: action.paging
      });
    case "IS_SEARCH":
      return Object.assign({}, state, {
        isSearch: action.isSearch
      });
    case "SET_NEXT":
      return Object.assign({}, state, {
        paging: {
          ...state.paging,
          start: action.start,
          end: action.end
        }
      });
    case "INCREASE_PAGE":
      return Object.assign({}, state, {
        // paging: { ...state.paging, start: action.start, end: action.end }
      });
    case "SET_NEXT_SEARCH":
      return Object.assign({}, state, {
        pagingSearch: {
          ...state.pagingSearch,
          start: action.start,
          end: action.end
        }
      });
    case "SET_ACTIVE":
      return Object.assign({}, state, {
        paging: { ...state.paging, active: action.active }
      });
    case "SET_ACTIVE_NEXT":
      return Object.assign({}, state, {
        paging: { ...state.paging, active: state.paging.active + action.active }
      });

    case "SET_ACTIVE_NEXT_SEARCH":
      return Object.assign({}, state, {
        pagingSearch: {
          ...state.pagingSearch,
          active: state.pagingSearch.active + action.active
        }
      });

    case "SET_ERROR":
      return Object.assign({}, state, {
        error: action.error
      });
    case "SET_PAGE_TOTAL":
      return Object.assign({}, state, {
        pageTotal: action.pageTotal
      });
    case "RESET_PRODUCT":
      return Object.assign({}, state, {
        products: ""
      });
    case "RESET_PRODUCT_STATE":
      return Object.assign({}, state, {
        products: "",
        pageTotal: 1,
        error: ""
      });

    //--------------- search state =====
    case "RESET_SEARCH":
      return Object.assign({}, state, {
        search: {
          pageSearch: 1,
          errorSearch: "",
          products: []
        }
      });
    case "SET_PAGE_SEARCH_TOTAL":
      return Object.assign({}, state, {
        search: { ...state.search, pageSearch: action.pageSearch }
      });
    case "SET_ERROR_SEARCH":
      return Object.assign({}, state, {
        search: { ...state.search, errorSearch: action.errorSearch }
      });
    case "SET_MSG_SUCCESS_SEARCH":
      return Object.assign({}, state, {
        search: { ...state.search, msgSuccess: action.success }
      });
    case "SET_PRODUCT_SEARCH":
      return Object.assign({}, state, {
        search: { ...state.search, products: action.products }
      });
    case "SET_SEARCH_PAGE_ACTIVE":
      return Object.assign({}, state, {
        pagingSearch: { ...state.pagingSearch, active: action.active }
      });
    // ------------------update state -----------
    case "SET_MESSAGE_UPDATE_SUCCESS":
      return Object.assign({}, state, {
        update: { ...state.update, msgUpdateSuccess: action.msgUpdateSuccess }
      });
    case "SET_MESSAGE_UPDATE_ERROR":
      return Object.assign({}, state, {
        update: { ...state.update, msgUpdateError: action.msgUpdateError }
      });
    // ----------------- delete --------------
    case "SET_MESSAGE_DELETE_SUCCESS":
      return Object.assign({}, state, {
        delete: { ...state.delete, msgDeleteSuccess: action.msgDelSuccess }
      });
    case "SET_MESSAGE_DELETE_ERRPR":
      return Object.assign({}, state, {
        delete: { ...state.delete, msgDeleteError: action.msgDelError }
      });
    // -----------------set msg-----------------
    case "SET_MESSAGE_ADD_SUCCESS":
      return Object.assign({}, state, {
        add: { ...state.add, msgSuccess: action.msgSuccess }
      });
    case "SET_MESSAGE_ADD_ERROR":
      return Object.assign({}, state, {
        add: { ...state.add, msgError: action.msgError }
      });
    // -----------------export qr ----------------
    case "SET_PAGE_TOTAL_EXPROT_QR":
      return Object.assign({}, state, {
        exportQr: { ...state.exportQr, pageTotal: action.page }
      });
    case "SET_DATA_EXPROT_QR":
      return Object.assign({}, state, {
        exportQr: {
          ...state.exportQr,
          // data: [...state.exportQr.data, action.data]
          data: action.data
        }
      });
    case "SET_DATA_EXPROT_QR_FOR":
      return Object.assign({}, state, {
        exportQr: {
          ...state.exportQr,
          // data: [...state.exportQr.data, action.data]
          data: [...state.exportQr.data].concat(action.data)
        }
      });
    case "RESET_DATA_EXPROT_QR":
      return Object.assign({}, state, {
        exportQr: {
          ...state.exportQr,
          data: []
        }
      });
    case "SET_MESSAGE_EXPORT_QR_ERROR":
      return Object.assign({}, state, {
        exportQr: {
          ...state.exportQr,
          msg: { ...state.exportQr.msg, msgError: action.msgError }
        }
      });
    case "SET_MESSAGE_EXPORT_QR_SUCCESS":
      return Object.assign({}, state, {
        exportQr: {
          ...state.exportQr,
          msg: { ...state.exportQr.msg, msgSuccess: action.msgSuccess }
        }
      });
    default:
      return state;
  }
};

export default productReducer;
