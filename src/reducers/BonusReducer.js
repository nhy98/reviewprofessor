/**
 * @author thucvv
 */

const bonusReducer = (
  state = {
    bonus: {
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      users: [],
      import: {
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        },
        total: 1,
        data: []
      }
    },
    search: {
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      data: []
    },
    bonuses: {
      list: {},
      bonusDetail: {},
      showPopupApproved: false,
      showPopupDetail: false
    }
  },
  action
) => {
  switch (action.type) {
    // --- bonus
    case "SET_USER_BONUS":
      return Object.assign({}, state, {
        bonus: { ...state.bonus, users: action.users }
      });
    case "REMOVE_USER_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          users: state.bonus.users.filter((x, i) => i !== action.index)
        }
      });
    case "ADD_A_USER_BONUS":
      return Object.assign({}, state, {
        bonus: { ...state.bonus, users: [...state.bonus.users, action.user] }
      });
    case "RESET_USER_BONUS":
      return Object.assign({}, state, {
        bonus: { ...state.bonus, users: [] }
      });
    case "SET_MSG_SUCCESS_BONUS_USER":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          msg: { ...state.bonus.msg, success: action.success }
        }
      });
    case "SET_MSG_ERROR_BONUS_USER":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          msg: { ...state.bonus.msg, error: action.error }
        }
      });
    // import bonus-----------------------
    case "SET_DATA_IMPORT_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          import: { ...state.bonus.import, data: action.data }
        }
      });

    case "RESET_DATA_IMPORT_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          import: { ...state.bonus.import, data: [] }
        }
      });
    case "SET_TOTAL_PAGE_DATA_IMPORT_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          import: { ...state.bonus.import, total: action.total }
        }
      });
    case "SET_MSG_SUCCESS_DATA_IMPORT_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          import: {
            ...state.bonus.import,
            msg: { ...state.bonus.import.msg, success: action.success }
          }
        }
      });
    case "SET_MSG_ERROR_DATA_IMPORT_BONUS":
      return Object.assign({}, state, {
        bonus: {
          ...state.bonus,
          import: {
            ...state.bonus.import,
            msg: { ...state.bonus.import.msg, error: action.error }
          }
        }
      });
    // --- search
    case "SET_USER_SEARCH_BONUS":
      return Object.assign({}, state, {
        search: { ...state.search, data: action.data }
      });
    case "SET_MSG_SUCCESS_SEARCH_USER_BONUS":
      return Object.assign({}, state, {
        search: {
          ...state.search,
          msg: { ...state.search.msg, success: action.success }
        }
      });
    case "SET_MSG_ERROR_SEARCH_USER_BONUS":
      return Object.assign({}, state, {
        search: {
          ...state.search,
          msg: { ...state.search.msg, error: action.error }
        }
      });
    // --- list bonus_program
    case "SEARCH_BONUS_PRO":
      return Object.assign({}, state, {
        bonuses: {
          ...state.bonuses,
          list: action.data
        }
      });
    case "SERCH_BONUS_DETAIL":
      return Object.assign({}, state, {
        bonuses: {
          ...state.bonuses,
          bonusDetail: action.data
        }
      });

    case "SHOW_POPUP_APPROVED":
      return Object.assign({}, state, {
        bonuses: {
          ...state.bonuses,
          showPopupApproved: action.data
        }
      });
    case "SHOW_POPUP_BONUS_DETAIL":
      return Object.assign({}, state, {
        bonuses: {
          ...state.bonuses,
          showPopupDetail: action.data
        }
      });
    default:
      return state;
  }
};

export default bonusReducer;
