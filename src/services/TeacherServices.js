/**
 * @author thucvv
 */
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
// import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  setUserData,
  setTotalPageUser,
  setMsgSuccessGetUser,
  setMsgErrorGetUser,
  setMsgSuccessUpdateUser,
  setMsgErrorUpdateUser,
  resetUserData,
  setMsgErrorUserAdmin,
  setMsgSuccessUserAdmin,
  setUserAdmin,
  setRole
} from "../actions/TeacherAction";
import { loginSuccess, setToken, setXKey } from "../actions/LoginAction";
import {
  errGetUsers,
  errUpdateRoleUsers,
  errGetUserAdmin
} from "../utils/ResponseCode";
import loginService from "../services/LoginService";
import i18n from "../views/components/I18n";
import { invokerApi } from "../utils/AxiosUtils";

function resetUserDataSearch(dispatch) {
  dispatch(resetUserData());
}
function getUsers(key, offset, dispatch) {
  axios({
    method: "GET",
    url: `${Api.CLASSES}?page=${offset}&size=${key}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
        const url = `${Api.CLASSES}?page=${offset}&size=${key}`;
        console.log(url);
        console.log("reponse get users  ===== ");
        console.log(response);
        console.log("data =================== ");
        console.log(data);
        
        dispatch(setUserData(data.content));
        dispatch(setTotalPageUser(data.totalPages));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setUserData([]));
        dispatch(setTotalPageUser(1));

        dispatch(
          setMsgSuccessGetUser({
            code: "success",
            message: i18n.t("response.no_content")
          })
        );
      }
    })
    .catch(error => {
      console.log("error get user list=== ");
      console.log(error);
      errGetUsers(error, setMsgErrorGetUser, dispatch);
    });
}
function getTeachers(key, offset, dispatch) {
  axios({
    method: "GET",
    url: `${Api.TEACHERS}?page=${offset}&size=${key}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
        const url = `${Api.CLASSES}?page=${offset}&size=${key}`;
        console.log(url);
        console.log("reponse get users  ===== ");
        console.log(response);
        console.log("data =================== ");
        console.log(data);
        console.log(data.content[0].id+"class iddđ");

        dispatch(setUserData(data.content));
        dispatch(setTotalPageUser(data.totalPages));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setUserData([]));
        dispatch(setTotalPageUser(1));

        dispatch(
          setMsgSuccessGetUser({
            code: "success",
            message: i18n.t("response.no_content")
          })
        );
      }
    })
    .catch(error => {
      console.log("error get user list=== ");
      console.log(error);
      errGetUsers(error, setMsgErrorGetUser, dispatch);
    });
}
function updateRoleUser(data, xKey, dispatch) {
  console.log("data update ");
  console.log(data);
  console.log(JSON.stringify(data));
  axios({
    method: "PUT",
    url: `${Api.USER}/roles`,
    data: { data: aesCryptoJs.encrypt(JSON.stringify(data), xKey) }
  })
    .then(response => {
      if (response.status === 201) {
        console.log("reponse update users  ===== ");
        console.log(response);
        console.log("data =================== ");

        dispatch(
          setMsgSuccessUpdateUser({
            code: "success",
            message: i18n.t("response.success")
          })
        );
      }
    })
    .catch(error => {
      console.log("error update user list=== ");
      console.log(error);
      errUpdateRoleUsers(error, setMsgErrorUpdateUser, dispatch);
    });
}
function getAClass(courseID,page,size,dispatch){
  let url = Api.CLASSES+'?search='+encodeURI(JSON.stringify(courseID))+'&page='+page+'&size='+size;
  console.log(courseID);
    invokerApi(url, "GET", null, classResponse, null, dispatch);
}
function classResponse(response,dispatch){
  if (response!=null) {
    const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
    console.log("reponse get users  ===== ");
    console.log(response);
    console.log("data =================== ");
    console.log(data);
    console.log(data.content.id+"class iddđ");

    dispatch(setUserData(data.content));
    dispatch(setTotalPageUser(data.totalPages));
  } else{
    console.log("no content");
    dispatch(setUserData([]));
    dispatch(setTotalPageUser(1));

    dispatch(
      setMsgSuccessGetUser({
        code: "success",
        message: i18n.t("response.no_content")
      })
    );
  }
}
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
    dispatch(setUserAdmin(data.content[0]));

  } else{
    console.log("no content");
    dispatch(setUserAdmin([]));  
    dispatch(
      setMsgSuccessGetUser({
        code: "success",
        message: i18n.t("response.no_content")
      })
    );
  }
}

function getUser(xKey, token, dispatch) {
  console.log("Get user ==== ");
  console.log("xKey == " + xKey + "   token == " + token);
  let url = Api.USER;
  invokerApi(url, "GET", null, userResponse, xKey, dispatch);

  // axios({
  //   method: "GET",
  //   url: `${Api.USER}`,
  //   headers: {
  //     Authorization: token
  //   }
  // })
  //   .then(response => {
  //     if (response.status === 200) {
  //       console.log("reponse  users  ===== ");
  //       console.log(response);
  //       console.log("data =================== ");
  //       const user = aesCryptoJs.decrypt(response.data.data, xKey);
  //       dispatch(setUserAdmin(user));
  //       dispatch(setRole(user.data.user_role));
  //       dispatch(setToken(token));
  //       dispatch(setXKey(xKey));
  //       dispatch(loginSuccess(true));
  //     } else if (response.status === 204) {
  //       console.log("No content");

  //       dispatch(
  //         setMsgSuccessUserAdmin({
  //           code: "success",
  //           message: i18n.t("response.no_content")
  //         })
  //       );
  //     }
  //   })
  //   .catch(error => {
  //     console.log("error   user  === ");
  //     console.log(error);
  //     errGetUserAdmin(error, setMsgErrorUserAdmin, dispatch);
  //   });
}

function userResponse(response, dispatch, xKey) {
  console.log("reponse  users  ===== ");
  console.log(response);
  console.log("data =================== ");
  const user = aesCryptoJs.decrypt(response.data.data, xKey);
  dispatch(setUserAdmin(user));
  dispatch(setRole(user.data.user_role));
  dispatch(loginSuccess(true));
}

const teacherServices = {
  getUsers,
  updateRoleUser,
  resetUserDataSearch,
  getUser,
  getTeachers,
  getAClass,
  getTeacher
};

export default teacherServices;
