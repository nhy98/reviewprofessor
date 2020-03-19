/**
*
*/

const managerUserReducer = (
  state = {
    users: {
      msg: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      },
      totalPage: 1,
      dataClass: [],
      update: {
        success: { code: "", message: "" },
        error: { code: "", message: "" }
      }
    },
    user: {
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
    
  
    case "SET_CLASS_DATA":
      return Object.assign({}, state, {
        users: { ...state.users, dataClass: action.data }
      });
    
    case "SET_TOTAL_PAGE_USER":
      return Object.assign({}, state, {
        users: { ...state.users, totalPage: action.totalPage }
      });
    case "SET_MSG_SUCCESS_GET_USER":
      return Object.assign({}, state, {
        users: {
          ...state.users,
          msg: { ...state.users.msg, success: action.success }
        }
      });
    case "SET_MSG_ERROR_GET_USER":
      return Object.assign({}, state, {
        users: {
          ...state.users,
          msg: { ...state.users.msg, error: action.error }
        }
      });



    default:
      return state;
  }
};

export default managerUserReducer;
