const reviewReducer = (
    state = {
      review: {
        msg: {
          success: { code: "", message: "" },
          error: { code: "", message: "" }
        },
        teacher:{
            name:"",
            school:""
        },
        flag:false
      }
    },
    action
  ) => {
    switch (action.type) {
        case "SET_REVIEW_DATA":
        return Object.assign({}, state, {
          review: { ...state.review, teacher: {name:action.data.name,school:action.data.school} }
        });
        case "SET_FLAG_DATA":
        return Object.assign({}, state, {
          review: { ...state.review, flag: action.data }
        });
        case "SET_MSG_SUCCESS_GET_USER":
        return Object.assign({}, state, {
          review: {
            ...state.review,
            msg: { ...state.review.msg, success: action.success }
          }
        });
      case "SET_MSG_ERROR_GET_USER":
        return Object.assign({}, state, {
          review: {
            ...state.review,
            msg: { ...state.review.msg, error: action.error }
          }
        });
      default:
        return state;
    }
  };
  
  export default reviewReducer;