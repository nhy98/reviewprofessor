/**
 * @author thucvv
 */

export function setTransaction(transaction) {
  return { type: "SET_TRANSACTION", transaction };
}

export function resetTransactionState() {
  return { type: "RESET_TRANSACTION_STATE" };
}

export function setMsgErrorTransaction(error) {
  return { type: "SET_MSG_ERROR_TRANSACTION", error };
}

export function setMsgSuccessTransaction(success) {
  return { type: "SET_MSG_SUCCESS_TRANSACTION", success };
}

// ------------- transaction detail action
export function setTransDetail(detailData) {
  return { type: "SET_TRANS_DETAIL_DATA", detailData };
}

export function setMsgErrorTransDetail(error) {
  return { type: "SET_MSG_ERROR_TRANS_DETAIL", error };
}

export function setMsgSuccessTransDetail(success) {
  return { type: "SET_MSG_SUCCESS_TRANS_DETAIL", success };
}

export function resetTransDetailState() {
  return { type: "RESET_TRANS_DETAIL_STATE" };
}

export function setPageTotalTransDetail(totalPage) {
  return { type: "SET_PAGE_TOTAL_TRANS_DETAIL", totalPage };
}

export function setNextPageTransDetail(start, end) {
  return { type: "SET_NEXT_PAGE_TRANS_DETAIL", start, end };
}

export function setActivePageTransDetail(active) {
  return { type: "SET_ACTIVE_PAGE_TRANS_DETAIL", active };
}

//
export function setBillDetails(billDetail) {
  return { type: "SET_BILL_DETAIL", billDetail };
}

export function setTotalBillDetails(total) {
  return { type: "SET_TOTAL_BILL_DETAIL", total };
}
