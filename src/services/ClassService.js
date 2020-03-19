/**
 * @author thucvv
 */
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
// import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  setClassData,
  setMsgSuccessGetUser,
  setMsgErrorGetUser,
  setTotalPageUser
} from "../actions/ClassesAction";
import { loginSuccess, setToken, setXKey } from "../actions/LoginAction";
import {
  errGetUsers,
  errUpdateRoleUsers,
  errGetUserAdmin
} from "../utils/ResponseCode";
import loginService from "../services/LoginService";
import i18n from "../views/components/I18n";
import { invokerApi } from "../utils/AxiosUtils";

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
        
        dispatch(setClassData(data.content));
        dispatch(setTotalPageUser(data.totalPages));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setClassData([]));
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
        
        dispatch(setClassData(data.content));
        dispatch(setTotalPageUser(data.totalPages));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setClassData([]));
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

function getAClass(courseID,page,size,dispatch){
  let url = Api.CLASSES+'?search='+encodeURI(JSON.stringify(courseID))+'&page='+page+'&size='+size;
    invokerApi(url, "GET", null, classResponse, null, dispatch);
}
function classResponse(response,dispatch){
  if (response!=null) {
    const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
    console.log("reponse get users  ===== ");
    console.log(response);
    console.log("data =================== ");
    console.log(data);
    
    dispatch(setClassData(data.content));
    dispatch(setTotalPageUser(data.totalPages));
  } else{
    console.log("no content");
    dispatch(setClassData([]));
    dispatch(setTotalPageUser(1));

    dispatch(
      setMsgSuccessGetUser({
        code: "success",
        message: i18n.t("response.no_content")
      })
    );
  }
}




const classServices = {
  getUsers,
  getTeachers,
  getAClass
};

export default classServices;
