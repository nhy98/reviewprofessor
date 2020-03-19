/**
 * @author thucvv
 */

import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  setCurrency,
  resetCurrencyState,
  setMsgErrorCurrency,
  setMsgSuccessCurrency
} from "../actions/CurrencyAction";
import { errGetCurrency } from "../utils/ResponseCode";
import i18n from "../views/components/I18n";
import dataUtils from "../utils/DataUtils";

function setCurrencyData(currency, dispatch) {
  dispatch(setCurrency(currency));
}

function resetCurrencyStateData(dispatch) {
  dispatch(resetCurrencyState());
}

function getCurrency(from, to, type, xKey, dispatch) {
  let isValidFrom = false,
    isValidTo = false;
  if (type === 0) {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM",
      false,
      setMsgErrorCurrency,
      dispatch
    );
    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM",
      false,
      setMsgErrorCurrency,
      dispatch
    );
  } else {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM-DD",
      false,
      setMsgErrorCurrency,
      dispatch
    );
    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM-DD",
      false,
      setMsgErrorCurrency,
      dispatch
    );
  }
  if (isValidFrom && isValidTo) {
    if (new Date(from) <= new Date(to)) {
      axios({
        method: "GET",
        url: `${Api.CURRENCY}?from=${from}&to=${to}&type=${type}`
      })
        .then(response => {
          if (response.status === 200) {
            const data = aesCryptoJs.decrypt(response.data.data, xKey);
            console.log("reponse currency  ===== ");
            console.log(response);
            let obj = JSON.parse(data);

            let currency = dataUtils.convertDataCurrency(obj);
            dispatch(setCurrency(currency));
          } else if (response.status === 204) {
            console.log("no content");
            let currency = {
              labels: [],
              data: []
            };
            dispatch(setCurrency(currency));

            dispatch(
              setMsgSuccessCurrency({
                code: "success",
                message: i18n.t("response.no_content")
              })
            );
          }
        })
        .catch(error => {
          console.log("error get currency list=== ");
          console.log(error);
          errGetCurrency(error, setMsgErrorCurrency, dispatch);
        });
    } else {
      dispatch(
        setMsgErrorCurrency({
          code: "EV001",
          message: i18n.t("error_validate.EV001")
        })
      );
    }
  }
}

const currencyService = {
  setCurrencyData,
  resetCurrencyStateData,
  getCurrency
};

export default currencyService;
