

const TeacherReducer = (
    state = {
      users: {
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        },
        totalPage: 1,
        dataTeacher: [],
        update: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        }
      },
      teacher:{
        name:"",
        school:"",
        id:"",
        age:"",
        address:"",
        phoneNumber:"",
        email:"",
        achievement:"",
        imageUrl:""
      }
    },
    action
  ) => {
    switch (action.type) {
      // set user admin
      case "SET_USER_ADMIN":
        return Object.assign({}, state, {
          user: { ...state.teacher, dataTeacher: action.data }
        });
      case "SET_MSG_SUCCESS_USER_ADMIN":
        return Object.assign({}, state, {
          user: {
            ...state.user,
            msg: { ...state.user.msg, success: action.success }
          }
        });
      case "SET_MSG_ERROR_USER_ADMIN":
        return Object.assign({}, state, {
          user: { ...state.user, msg: { ...state.user.msg, error: action.error } }
        });
      //-----------
      case "SET_USER_DATA":
        return Object.assign({}, state, {
          users: { ...state.users, dataTeacher: action.data }
        });
      case "RESET_USER_DATA":
        return Object.assign({}, state, {
          users: { ...state.users, dataTeacher: [] }
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
  
      case "SET_MSG_SUCCESS_UPDATE_USER":
        return Object.assign({}, state, {
          users: {
            ...state.users,
            update: { ...state.users.update, success: action.success }
          }
        });
      case "SET_MSG_ERROR_UPDATE_USER":
        return Object.assign({}, state, {
          users: {
            ...state.users,
            update: { ...state.users.update, error: action.error }
          }
        });
  
      case "SET_USER_ROLE":
        return Object.assign({}, state, {
          users: {
            ...state.user,
            user: { ...state.user, role: action.data }
          }
        });
  
      default:
        return state;
    }
  };
  
  export default TeacherReducer;
  