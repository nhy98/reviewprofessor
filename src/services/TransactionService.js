/**
 * @author thucvv
 */
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  setTransaction,
  resetTransactionState,
  setMsgErrorTransaction,
  setMsgSuccessTransaction,
  setTransDetail,
  setBillDetails,
  setPageTotalTransDetail,
  setMsgErrorTransDetail,
  setMsgSuccessTransDetail,
  setTotalBillDetails
} from "../actions/TransactionAction";
import {
  errGetTransaction,
  errGetTransDetails,
  errGetBillDetails
} from "../utils/ResponseCode";
import i18n from "../views/components/I18n";
import dataUtils from "../utils/DataUtils";
import stringUtils from "../utils/StringUtils";

function setTransactionData(revenue, dispatch) {
  dispatch(setTransaction(revenue));
}

function resetTransactionStateData(dispatch) {
  dispatch(resetTransactionState());
}

/**
 * Get Transaction ----------------
 * @param {*} from date
 * @param {*} to date
 * @param {*} type
 * @param {*} xKey
 * @param {*} dispatch
 */
function getTransaction(from, to, type, xKey, dispatch) {
  let isValidFrom = false,
    isValidTo = false;

  if (type === 0) {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM",
      false,
      setMsgErrorTransaction,
      dispatch
    );

    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM",
      false,
      setMsgErrorTransaction,
      dispatch
    );
  } else {
    isValidFrom = validate.validateDateString(
      from,
      "YYYY-MM-DD",
      false,
      setMsgErrorTransaction,
      dispatch
    );

    isValidTo = validate.validateDateString(
      to,
      "YYYY-MM-DD",
      false,
      setMsgErrorTransaction,
      dispatch
    );
  }
  if (isValidFrom && isValidTo) {
    if (new Date(from) <= new Date(to)) {
      axios({
        method: "GET",
        url: `${Api.TRANSACTION}?from=${from}&to=${to}&type=${type}`
      })
        .then(response => {
          console.log("response get transaction >>> : ");
          console.log(response);

          if (response.status === 200) {
            const data = aesCryptoJs.decrypt(response.data.data, xKey);
            console.log("reponse transactiono  ===== ");
            console.log(response);
            let obj = JSON.parse(data);

            let transaction = dataUtils.convertTransChart2Line(obj);
            dispatch(setTransaction(transaction));
          } else if (response.status === 204) {
            console.log("no content");
            let transaction = {
              labels: [],
              data: []
            };
            dispatch(setTransaction(transaction));

            dispatch(
              setMsgSuccessTransaction({
                code: "success",
                message: i18n.t("response.no_content")
              })
            );
          }
        })
        .catch(error => {
          console.log("error get transaction list=== ");
          console.log(error);
          errGetTransaction(error, setMsgErrorTransaction, dispatch);
        });
    } else {
      dispatch(
        setMsgErrorTransaction({
          code: "EV001",
          message: i18n.t("error_validate.EV001")
        })
      );
    }
  }
}

/**
 * Search transaction details
 */
function searchTransactionDetails(
  key,
  type,
  offset,
  limit,
  from,
  to,
  dispatch
) {
  let valid = true;
  // if (type === "3" || type === 3) {
  if (stringUtils.isEmpty(type)) {
    if (
      !validate.validateDateString(
        from,
        "YYYY-MM-DD",
        false,
        setMsgErrorTransDetail,
        dispatch
      ) ||
      !validate.validateDateString(
        to,
        "YYYY-MM-DD",
        false,
        setMsgErrorTransDetail,
        dispatch
      )
    ) {
      valid = false;
    }

    if (new Date(from) > new Date(to)) {
      valid = false;
      dispatch(
        setMsgErrorTransDetail({
          code: "error",
          message: i18n.t("error_validate.EV001")
        })
      );
    }
  } else if (type === 1 || type === "1") {
    key = key.trim();
    if (key === "" || key === null) {
      valid = false;

      dispatch(
        setMsgErrorTransDetail({
          code: "EV002",
          message: i18n.t("error_validate.EV002")
        })
      );
    }
  } else if (type === 0 || type === "0") {
    key = key.trim();
    if (key === "" || key === null) {
      valid = false;

      dispatch(
        setMsgErrorTransDetail({
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
        Api.HISTORY
      }?key=${key}&type=${type}&offset=${offset}&limit=${limit}&from=${from}&to=${to}`
    })
      .then(response => {
        if (response.status === 200) {
          const data = response.data.data;
          console.log("reponse transactiono details  ===== ");
          console.log(response);
          console.log("data ======== ");
          console.log(data);
          dispatch(setTransDetail(data.item));
          dispatch(setPageTotalTransDetail(data.max_page));
        } else if (response.status === 204) {
          dispatch(setTransDetail([]));
          dispatch(setPageTotalTransDetail(1));
          console.log("no content");

          dispatch(
            setMsgSuccessTransDetail({
              code: "success",
              message: i18n.t("response.no_content")
            })
          );
        }
      })
      .catch(error => {
        console.log("error get transaction details list=== ");
        console.log(error);
        errGetTransDetails(error, setMsgErrorTransDetail, dispatch);
      });
  }
}

function getBillDetails(billId, xKey, dispatch) {
  if (validate.isNumber(billId, false, setMsgErrorTransDetail, dispatch)) {
    const billEnc = aesCryptoJs.encrypt(billId.toString(), xKey);
    const billUrlEnc = encodeURIComponent(billEnc);
    axios({
      method: "GET",
      url: `${Api.BILL_DETAIL}?bill_id=${billUrlEnc}`
    })
      .then(response => {
        if (response.status === 200) {
          const obj = aesCryptoJs.decrypt(response.data.data, xKey);
          const data = JSON.parse(obj);
          dispatch(setBillDetails(data.item));
          dispatch(setTotalBillDetails(data.total));
        } else if (response.status === 204) {
          console.log("no content");
          dispatch(setBillDetails([]));
          dispatch(setTotalBillDetails(0));

          dispatch(
            setMsgSuccessTransDetail({
              code: "success",
              message: i18n.t("response.no_content")
            })
          );
        }
      })
      .catch(error => {
        console.log("error get bill details transaction=== ");
        console.log(error);
        errGetBillDetails(error, setMsgErrorTransDetail, dispatch);
      });
  }
}

const transactionService = {
  setTransactionData,
  resetTransactionStateData,
  getTransaction,
  searchTransactionDetails,
  getBillDetails
};

export default transactionService;
