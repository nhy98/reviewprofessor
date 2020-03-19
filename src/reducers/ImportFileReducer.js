/**
 * @author thucvv
 */

const importFileReducer = (
  state = {
    pagingImport: {
      start: 1,
      end: 4,
      active: 1
    },
    pagingListFileImport: {
      start: 1,
      end: 4,
      active: 1
    },
    pageNumDataImport: 1,
    pageNumListFileImport: 1,
    productDataImport: {
      msg: {
        msgError: { code: "", message: "" },
        msgSuccess: { code: "", message: "" }
      },
      data: []
    },
    listFileProductImport: {
      msg: {
        msgSuccess: { code: "", message: "" },
        msgError: { code: "", message: "" }
      },
      data: []
    },
    productDataExport: {
      total: 1,
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    // --- import ----------------
    case "SET_PRODUCT_DATA_IMPORT":
      return Object.assign({}, state, {
        productDataImport: { ...state.productDataImport, data: action.data }
      });
    case "SET_MSG_SUCCESS_DATA_IMPORT":
      return Object.assign({}, state, {
        productDataImport: {
          ...state.productDataImport,
          msg: { ...state.productDataImport.msg, msgSuccess: action.success }
        }
      });
    case "SET_MSG_ERROR_DATA_IMPORT":
      return Object.assign({}, state, {
        productDataImport: {
          ...state.productDataImport,
          msg: { ...state.productDataImport.msg, msgError: action.error }
        }
      });
    case "RESET_DATA_IMPORT":
      return Object.assign({}, state, {
        productDataImport: {
          msg: {
            msgError: { code: "", message: "" },
            msgSuccess: { code: "", message: "" }
          },
          data: []
        }
      });
    case "SET_PRODUCT_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: action.data
      });
    // -- import list file -------
    case "SET_LIST_FILE_PRODUCT_IMPORT":
      return Object.assign({}, state, {
        listFileProductImport: {
          ...state.listFileProductImport,
          data: action.data
        }
      });
    case "SET_MSG_SUCCESS_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        listFileProductImport: {
          ...state.listFileProductImport,
          msg: {
            ...state.listFileProductImport.msg,
            msgSuccess: action.success
          }
        }
      });
    case "SET_MSG_ERROR_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        listFileProductImport: {
          ...state.listFileProductImport,
          msg: {
            ...state.listFileProductImport.msg,
            msgError: action.error
          }
        }
      });
    // -- reset import list file state ---------
    case "RESET_IMPORT_FILE_STATE":
      return Object.assign({}, state, {
        productDataImport: [],
        listFileProductImport: [],
        productDataExport: []
      });
    // ---- next, active ----
    case "SET_NEXT_PAGING_IMPORT":
      return Object.assign({}, state, {
        pagingImport: {
          ...state.pagingImport,
          start: action.start,
          end: action.end
        }
      });
    case "SET_NEXT_PAGING_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        pagingListFileImport: {
          ...state.pagingListFileImport,
          start: action.start,
          end: action.end
        }
      });

    case "SET_ACTIVE_PAGING_IMPORT":
      return Object.assign({}, state, {
        pagingImport: { ...state.pagingImport, active: action.active }
      });

    case "SET_ACTIVE_NEXT_PAGING_IMPORT":
      return Object.assign({}, state, {
        pagingImport: {
          ...state.pagingImport,
          active: state.pagingImport.active + action.active
        }
      });
    // LIST
    case "SET_ACTIVE_PAGING_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        pagingListFileImport: {
          ...state.pagingListFileImport,
          active: action.active
        }
      });

    case "SET_ACTIVE_NEXT_PAGING_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        pagingListFileImport: {
          ...state.pagingListFileImport,
          active: state.pagingListFileImport.active + action.active
        }
      });
    // -------
    // ------- setpage total
    case "SET_PAGE_NUM_DATA_IMPORT":
      return Object.assign({}, state, {
        pageNumDataImport: action.page
      });
    case "SET_PAGE_NUM_LIST_FILE_IMPORT":
      return Object.assign({}, state, {
        pageNumListFileImport: action.page
      });
    // data export ------------
    case "SET_TOTAL_PAGE_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: { ...state.productDataExport, total: action.page }
      });
    case "ADD_NEW_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: {
          ...state.productDataExport,
          data: [...state.productDataExport.data, action.data]
        }
      });
    case "RESET_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: {
          total: 1,
          msg: {
            success: { code: "", message: "" },
            error: { code: "", message: "" }
          },
          data: []
        }
      });

    case "SET_MSG_SUCCESS_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: {
          ...state.productDataExport,
          msg: { ...state.productDataExport.msg, success: action.success }
        }
      });
    case "SET_MSG_ERROR_DATA_EXPORT":
      return Object.assign({}, state, {
        productDataExport: {
          ...state.productDataExport,
          msg: { ...state.productDataExport.msg, error: action.error }
        }
      });
    default:
      return state;
  }
};

export default importFileReducer;
