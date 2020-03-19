/**
 * @author caott
 */

import {invokerApi} from "../utils/AxiosUtils";
import Api from "../utils/Api";
import msgErrorAction from "../actions/MessageErrorAction";
import {setListBonus} from "../actions/BonusAcion";

function getBonusList(status, limit, offset, dispatch) {
    dispatch(msgErrorAction.setErrorCode([]));
    dispatch(msgErrorAction.setMsgError([]));
    let url = Api.BONUS + "?";
    if (status) {
        url += "status=" + status + "&"; 
    }

    if (limit) {
        url += "limit=" + limit + "&";
    }

    if (offset) {
        url += "offset=" + offset + "&";
    }
    let result = invokerApi(url, "GET", null, getData, null, dispatch);
}

function getData(response, dispatch) {
    console.log("getData : " + response);
    let data = [];
    if (response) {
        data = response.data.data;
    }
    dispatch(setListBonus(data));
}

const searchBonusService = {
   getBonusList
  };
  
  export default searchBonusService;