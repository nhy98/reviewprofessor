import store from "../stores/store";

import {
  setMsgErrorTransaction,
  setMsgErrorTransDetail,
  setMsgSuccessTransDetail,
  setMsgSuccessTransaction
} from "../actions/TransactionAction";
import { setMsgErrorCurrency } from "../actions/CurrencyAction";
import {
  setMsgErrorBonusUser,
  setMsgSuccessBonusUser
} from "../actions/BonusAcion";
import { setMsgErrorListFileImport } from "../actions/ImportFileAction";
import stringUtils from "./StringUtils";

import {
  setMsgErrorGetUser,
  setMsgSuccessGetUser,
  setMsgSuccessUpdateUser,
  setMsgErrorUpdateUser
} from "../actions/UserAction";
import { updateError } from "../actions/LoginAction";


// transactin err

function clearErrTransaction() {
  store.dispatch(setMsgErrorTransaction({ code: "", message: "" }));
  store.dispatch(setMsgSuccessTransaction({ code: "", message: "" }));
}

function clearErrTransactionDetail() {
  store.dispatch(setMsgErrorTransDetail({ code: "", message: "" }));
  store.dispatch(setMsgSuccessTransDetail({ code: "", message: "" }));
}

// currency err

function clearErrCurrency() {
  store.dispatch(setMsgErrorCurrency({ code: "", message: "" }));
}

// bonus err

function clearErrBonusUser() {
  store.dispatch(setMsgErrorBonusUser({ code: "", message: "" }));
  store.dispatch(setMsgSuccessBonusUser({ code: "", message: "" }));
}



function clearMsgUser() {
  const errorGet = store.getState().ManagerUserReducer.users.msg.error;
  const successGet = store.getState().ManagerUserReducer.users.msg.success;
  const errorUpdate = store.getState().ManagerUserReducer.users.update.error;
  const successUpdate = store.getState().ManagerUserReducer.users.update
    .success;
  if (
    stringUtils.jsonCheckExistKey(errorGet, "code") &&
    stringUtils.jsonCheckExistKey(errorGet, "message") &&
    !stringUtils.isEmpty(errorGet.message)
  ) {
    store.dispatch(setMsgErrorGetUser({ code: "", message: "" }));
  }

  if (
    stringUtils.jsonCheckExistKey(successGet, "code") &&
    stringUtils.jsonCheckExistKey(successGet, "message") &&
    !stringUtils.isEmpty(successGet.message)
  ) {
    store.dispatch(setMsgSuccessGetUser({ code: "", message: "" }));
  }

  if (
    stringUtils.jsonCheckExistKey(successUpdate, "code") &&
    stringUtils.jsonCheckExistKey(successUpdate, "message") &&
    !stringUtils.isEmpty(successUpdate.message)
  ) {
    store.dispatch(setMsgSuccessUpdateUser({ code: "", message: "" }));
  }

  if (
    stringUtils.jsonCheckExistKey(errorUpdate, "code") &&
    stringUtils.jsonCheckExistKey(errorUpdate, "message") &&
    !stringUtils.isEmpty(errorUpdate.message)
  ) {
    store.dispatch(setMsgErrorUpdateUser({ code: "", message: "" }));
  }
}

// import err

function clearErrImport() {
  const error = store.getState().ImportFileReducer.listFileProductImport.msg
    .msgError;
  if (
    stringUtils.jsonCheckExistKey(error, "code") &&
    stringUtils.jsonCheckExistKey(error, "message") &&
    !stringUtils.isEmpty(error.message)
  )
    store.dispatch(setMsgErrorListFileImport({ code: "", message: "" }));
}

// error Login
function clearErrLogin() {
  const error = store.getState().LoginReducer.error;
  if (
    !stringUtils.isEmpty(error) &&
    stringUtils.jsonCheckExistKey(error, "code") &&
    stringUtils.jsonCheckExistKey(error, "message")
  ) {
    store.dispatch(updateError({ code: "", message: "" }));
  }
}


const stateUtils = {
  clearErrLogin,
  clearMsgUser,
  clearErrTransactionDetail,
  clearErrTransaction,
  clearErrCurrency,
  clearErrBonusUser,
  clearErrImport
};

export default stateUtils;
