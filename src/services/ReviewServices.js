import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
// import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  errGetUsers,
  errUpdateRoleUsers,
  errGetUserAdmin
} from "../utils/ResponseCode";
import i18n from "../views/components/I18n";
import { invokerApi } from "../utils/AxiosUtils";
import {
    setReviewData,
    setMsgSuccessGetUser,
    setMsgErrorGetUser,
    setFlag
  } from "../actions/ReviewAction";
  const flag=false;
  function getTeacher(teacher,dispatch){
    let url = Api.TEACHERS+'?search='+encodeURI(JSON.stringify(teacher)+'&page=0&size=10');
      invokerApi(url, "GET", null, teacherResponse, null, dispatch);
  }
  function teacherResponse(response,dispatch){
    if (response!=null) {
      const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
      console.log("reponse get users  ===== ");
      console.log(response);
      console.log(data.content[0].name+"class iddđ");

      console.log("data =================== ");
      console.log(data);
      flag = true;
      dispatch(setReviewData(data.content[0]));
      dispatch(setFlag(true));

    } else{
      console.log("no content");
      dispatch(setReviewData([]));  
      dispatch(
        setMsgSuccessGetUser({
          code: "success",
          message: i18n.t("response.no_content")
        })
      );
    }
  }
  function reviewResponse(response,dispatch){
    if (response!=null) {
      console.log("reponse get users  ===== ");
      console.log(response);
      console.log("submit review successfullllll")
    } else{
      console.log("no content");
      dispatch(
        setMsgSuccessGetUser({
          code: "success",
          message: i18n.t("response.no_content")
        })
      );
    }
  }
function submitReview(review,teacher,dispatch){

    console.log(review.content+"---------------------------");
    console.log(review.teacherRate+"---------------------------");
    console.log(review.subjectRate+"---------------------------");
    console.log(review.createdDate+"---------------------------");
    console.log(review.clazz.id+"---------------------------");
    console.log(review.clazz.teacher.name+"---------------------------");
    console.log(review.clazz.teacher.school+"---------------------------");
    console.log(review.user.userId+"---------------------------");
    console.log(review.user.role+"-----"+"role2");

    let url = Api.REVIEW;
    const data = {
      "teacherRate": review.teacherRate,
      "subjectRate": review.subjectRate,
      "createdDate": review.createdDate,
      "tag": "như lồn lozzzzzzzzz",
      "content": review.content,
      "credit": 1,
      "attendance": 0,
      "clazz":{
        id:review.clazz.id,
        teacher:{
          name:teacher.name,
          school:teacher.school
        }
      },
      "user": {
        userId:2,
        role:2
      }
  };
  const obj = review;
      console.log(data.clazz.teacher.name+"---------------------------");

  
      axios.post(url, obj, {
            headers: {
            'content-type': 'application/json',
          }
      })
      .then(response => {
        console.log("<<<<<<<<Rx |< RESPONSE");
        // console.log(response);
        if (response.status === 200 || response.status === 201) {
            reviewResponse(response, dispatch);
        } else if (response.status === 204) {
          console.log("no content");
          reviewResponse(null, dispatch);
        }
        console.log("=======END===========");
      }).catch(error => {
        console.log("Exception: " + error);
      });
      
    //invokerApi(url, "POST", data, reviewResponse, null, dispatch);

}
const reviewServices = {
    getTeacher,
    flag,
    submitReview
  };
  
  export default reviewServices;
  