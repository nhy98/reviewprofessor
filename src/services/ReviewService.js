/**
 * @author thucvv
 */
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
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
function getReviews(dispatch) {
  axios({
    method: "GET",
    url: `${Api.REVIEWS}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data; //aesCryptoJs.decrypt(response.data.data, xKey);
        console.log("reponse get users  ===== ");
        console.log(response);
        console.log("data =================== ");
        console.log(data);

        dispatch(setUserData(data.content));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setUserData([]));

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



const reviewService = {
  getReviews
};

export default reviewService;
