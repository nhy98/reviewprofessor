/**
 * @author caott
 */
import { invokerApi } from "../utils/AxiosUtils";
import Api from "../utils/Api";
import msgErrorAction from "../actions/MessageErrorAction";
import { setBonusDetail, setPopupApproved } from "../actions/BonusAcion";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import searchBonusService from "./SearchBonusService";

function getBonusDetail(dispatch, bonusId) {
  dispatch(msgErrorAction.setErrorCode([]));
  dispatch(msgErrorAction.setMsgError([]));
  let url = Api.BONUS + "/" + bonusId;
  let result = invokerApi(
    url,
    "GET",
    null,
    getBonusDetailResponse,
    null,
    dispatch
  );
}

function approvedBonus(dispatch, bonusIdArrr, otp, xKey) {
  dispatch(msgErrorAction.setErrorCode([]));
  // dispatch(msgErrorAction.setMsgError([]));
  let url = Api.BONUS + "/approved";
  let data = {};
  data["otp"] = otp;
  data["bonusIds"] = bonusIdArrr;
  let requestBody = aesCryptoJs.encrypt(JSON.stringify(data), xKey);
  console.log("data: " + JSON.stringify(data));
  invokerApi(url, "PUT", requestBody, approveResponse, null, dispatch);
}

function getBonusDetailResponse(response, dispatch) {
  console.log("data : " + response);
  let data = response.data.data;
  // searchBonusService.getBonusList(null, 10, 0, dispatch);
  dispatch(setBonusDetail(data));
}

function approveResponse(response, dispatch) {
  console.log("approveResponse : " + response);
  setTimeout(
    function() {
      //Start the timer
      searchBonusService.getBonusList(null, 10, 0, dispatch);
      dispatch(setPopupApproved(false)); //After 1 second, set render to true
    }.bind(this),
    7000
  );
}

const bonusDetailService = {
  getBonusDetail,
  approvedBonus
};

export default bonusDetailService;
