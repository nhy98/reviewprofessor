/**
 * @author thucvv
 */

import { invokerApi } from "../utils/AxiosUtils";
import Api from "../utils/Api";
import action from "../actions/CorrelationAction";
import colors from "../utils/colors/color";
import msgErrorAction from "../actions/MessageErrorAction";
import aes from "../utils/cryptographics/AesCryptoJs";
import i18n from "../views/components/I18n";

function setCorrelationData(correlation, dispatch) {
  dispatch(action.setCorrelation(correlation));
}

function resetCorrelationStateData(dispatch) {
  dispatch(action.resetCorrelationState());
}

function search(from, to, key, dispatch) {
  if (new Date(from) <= new Date(to)) {
    console.log("from : ", from, "   to: ", to);

    dispatch(msgErrorAction.setErrorCode([]));
    dispatch(msgErrorAction.setMsgError([]));
    let url = Api.CORRELATION + "?";
    if ((from !== null) & (from !== "")) {
      url = url + "from=" + from;
    }
    if ((to !== null) & (to !== "")) {
      if (url.indexOf("from") > -1) {
        url = url + "&to=" + to;
      } else {
        url = url + "to=" + to;
      }
    }

    console.log("colleration from = ", from, "    to =  ", to);
    let result = invokerApi(url, "GET", null, getData, key, dispatch);
  } else {
    let errorCodes = [];
    errorCodes.push("EV001");
    dispatch(msgErrorAction.setErrorCode(errorCodes));
  }
}

function getData(response, dispatch, key) {
  let obj = {};
  let data;
  if (key !== null) {
    let dataEncryt = response.data.data;
    data = aes.decrypt(dataEncryt, key);
  } else {
    data = response.data.data;
  }
  if (data) {
    obj = JSON.parse(data);
  }
  console.log(obj);
  let labels = [];
  let datasets = [];
  let colorArr = [];
  console.log("data corelation >>>>>>>> :  ");
  obj.sort((a, b) => Number(b.AMOUNT) - Number(a.AMOUNT));
  const LIMIT = 9;
  let other = 0;

  for (let i = 0; i < obj.length; i++) {
    if (i < LIMIT) {
      labels.push(obj[i].P_NAME);
      datasets.push(obj[i].AMOUNT);
      colorArr.push(colors[i]);
    } else {
      other += Number(obj[i].AMOUNT);
    }
  }

  // #ECAB53
  if (other > 0) {
    labels.push(i18n.t("layout_common.other"));
    datasets.push(other);
    colorArr.push("#ECAB53");
  }

  dispatch(action.initReport(labels, datasets, colorArr));
}

const correlationService = {
  setCorrelationData,
  resetCorrelationStateData,
  search,
  getData
};

export default correlationService;
