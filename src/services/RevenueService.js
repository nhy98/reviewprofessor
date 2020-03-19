/**
 * @author thucvv
 */
import {
  setRevenue,
  resetRevenueState,
  setMsgErrorRevenue,
  setMsgSuccessRevenue,
  setBillRevenue,
  setDetailRevenue,
  setMsgErrorDetailRevenue,
  setMsgSuccessDetailRevenue,
  setTotalPageDetailRevenue,
  setTotalBillRevenue
} from "../actions/RevenueAction";
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import i18n from "../views/components/I18n";
import dataUtils from "../utils/DataUtils";

import {
  errGetRevenue,
  errGetRevenueDetails,
  errGetBillDetails
} from "../utils/ResponseCode";
import stringUtils from "../utils/StringUtils";
function setRevenueData(revenue, dispatch) {
  dispatch(setRevenue(revenue));
}

function resetRevenueStateData(dispatch) {
  dispatch(resetRevenueState());
}

function getRevenue(from, to, type, xKey, dispatch) {
  let isValidFrom, isValidTo;
  if (type === 0) {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM",
      false,
      setMsgErrorRevenue,
      dispatch
    );
    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM",
      false,
      setMsgErrorRevenue,
      dispatch
    );
  } else {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM-DD",
      false,
      setMsgErrorRevenue,
      dispatch
    );
    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM-DD",
      false,
      setMsgErrorRevenue,
      dispatch
    );
  }
  if (isValidFrom && isValidTo) {
    if (new Date(from) <= new Date(to)) {
      axios({
        method: "GET",
        url: `${Api.REVENUE}?from=${from}&to=${to}&type=${type}`
      })
        .then(response => {
          console.log("response revenue >>>>>>>>>>>>>>>>>>>>>");

          console.log(response);
          if (response.status === 200) {
            const data = aesCryptoJs.decrypt(response.data.data, xKey);
            let obj = JSON.parse(data);

            let revenue = dataUtils.convertRevenueChart2Line(obj);

            dispatch(setRevenue(revenue));
          } else if (response.status === 204) {
            console.log("no content");
            let revenue = {
              labels: [],
              data: [[], []]
            };
            dispatch(setRevenue(revenue));

            dispatch(
              setMsgSuccessRevenue({
                code: "success",
                message: i18n.t("response.no_content")
              })
            );
          }
        })
        .catch(error => {
          console.log("error get revene list=== ");
          console.log(error);
          errGetRevenue(error, setMsgErrorRevenue, dispatch);
        });
    } else {
      dispatch(
        setMsgErrorRevenue({
          code: "EV001",
          message: i18n.t("error_validate.EV001")
        })
      );
    }
  }
}

function getRevenueDetails(key, type, offset, limit, from, to, dispatch) {
  console.log("type call api === : ", type);

  let valid = true;
  // if (Number(type) === 3) {
  if (stringUtils.isEmpty(type)) {
    if (
      !validate.validateDateString(
        from,
        "YYYY-MM-DD",
        false,
        setMsgErrorDetailRevenue,
        dispatch
      ) ||
      !validate.validateDateString(
        to,
        "YYYY-MM-DD",
        false,
        setMsgErrorDetailRevenue,
        dispatch
      )
    ) {
      valid = false;
    }

    console.log("new date from : ", new Date(from));

    if (new Date(from) > new Date(to)) {
      valid = false;
      dispatch(
        setMsgErrorDetailRevenue({
          code: "error",
          message: i18n.t("error_validate.EV001")
        })
      );
    }
  } else if (Number(type) === 1) {
    key = key.trim();
    if (stringUtils.isEmpty(key)) {
      valid = false;

      dispatch(
        setMsgErrorDetailRevenue({
          code: "EV002",
          message: i18n.t("error_validate.EV002")
        })
      );
    }
  } else if (Number(type) === 0) {
    key = key.trim();
    if (stringUtils.isEmpty(key)) {
      valid = false;

      dispatch(
        setMsgErrorDetailRevenue({
          code: "EV003",
          message: i18n.t("error_validate.EV003")
        })
      );
    }
  }

  if (valid) {
    axios({
      method: "GET",
      url: `${
        Api.BILL
      }?key=${key}&type=${type}&from=${from}&to=${to}&limit=${limit}&offset=${offset}`
    })
      .then(response => {
        if (response.status === 200) {
          const data = response.data.data;
          console.log("reponse transactiono details  ===== ");
          console.log(response);
          console.log("data ======== ");
          console.log(data);
          dispatch(setDetailRevenue(data.item));
          dispatch(setTotalPageDetailRevenue(data.max_page));
        } else if (response.status === 204) {
          console.log("no content");
          dispatch(setDetailRevenue([]));
          dispatch(setTotalPageDetailRevenue(1));

          dispatch(
            setMsgSuccessDetailRevenue({
              code: "success",
              message: i18n.t("response.no_content")
            })
          );
        }
      })
      .catch(error => {
        console.log("error get transaction details list=== ");
        console.log(error);
        errGetRevenueDetails(error, setMsgErrorDetailRevenue, dispatch);
      });
  }
}

function getBillDetails(billId, xKey, dispatch) {
  if (validate.isNumber(billId, false, setMsgErrorDetailRevenue, dispatch)) {
    const billEnc = aesCryptoJs.encrypt(billId.toString(), xKey);
    const billUrlEnc = encodeURIComponent(billEnc);
    axios({
      method: "GET",
      url: `${Api.BILL_DETAIL}?bill_id=${billUrlEnc}`
    })
      .then(response => {
        if (response.status === 200) {
          console.log("response revenue bill detail ");
          console.log(response);

          const obj = aesCryptoJs.decrypt(response.data.data, xKey);
          const data = JSON.parse(obj);

          dispatch(setBillRevenue(data.item));
          dispatch(setTotalBillRevenue(data.total));
        } else if (response.status === 204) {
          console.log("no content");
          dispatch(setBillRevenue([]));
          dispatch(setTotalBillRevenue(0));

          dispatch(
            setMsgSuccessDetailRevenue({
              code: "success",
              message: i18n.t("response.no_content")
            })
          );
        }
      })
      .catch(error => {
        console.log("error get bill details list=== ");
        console.log(error);
        errGetBillDetails(error, setMsgErrorDetailRevenue, dispatch);
      });
  }
}

const revenueService = {
  setRevenueData,
  resetRevenueStateData,
  getRevenue,
  getRevenueDetails,
  getBillDetails
};

export default revenueService;
