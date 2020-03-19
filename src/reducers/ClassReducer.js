
const ClassReducer = (
    state = {
      classes: {
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        },
        totalPage: 1,
        data: [],
        update: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        }
      },
      class: {
        data: "",
        role: 0,
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        }
      }
    },
    action
  ) => {
    switch (action.type) {
      // set user admin
      case "SET_USER_ADMIN":
        return Object.assign({}, state, {
          user: { ...state.class, data: action.data }
        });
      case "SET_MSG_SUCCESS_USER_ADMIN":
        return Object.assign({}, state, {
          user: {
            ...state.class,
            msg: { ...state.class.msg, success: action.success }
          }
        });
      case "SET_MSG_ERROR_USER_ADMIN":
        return Object.assign({}, state, {
          user: { ...state.class, msg: { ...state.class.msg, error: action.error } }
        });
      //-----------
      case "SET_USER_DATA":
        return Object.assign({}, state, {
          users: { ...state.classes, data: action.data }
        });
      case "RESET_USER_DATA":
        return Object.assign({}, state, {
          users: { ...state.classes, data: [] }
        });
      case "SET_TOTAL_PAGE_USER":
        return Object.assign({}, state, {
          users: { ...state.classes, totalPage: action.totalPage }
        });
      case "SET_MSG_SUCCESS_GET_USER":
        return Object.assign({}, state, {
          users: {
            ...state.classes,
            msg: { ...state.classes.msg, success: action.success }
          }
        });
      case "SET_MSG_ERROR_GET_USER":
        return Object.assign({}, state, {
          users: {
            ...state.classes,
            msg: { ...state.classes.msg, error: action.error }
          }
        });
  
      case "SET_MSG_SUCCESS_UPDATE_USER":
        return Object.assign({}, state, {
          users: {
            ...state.classes,
            update: { ...state.classes.update, success: action.success }
          }
        });
      case "SET_MSG_ERROR_UPDATE_USER":
        return Object.assign({}, state, {
          users: {
            ...state.classes,
            update: { ...state.classes.update, error: action.error }
          }
        });
  
      case "SET_USER_ROLE":
        return Object.assign({}, state, {
          users: {
            ...state.class,
            user: { ...state.class, role: action.data }
          }
        });
  
      default:
        return state;
    }
  };
  
  export default ClassReducer;
  