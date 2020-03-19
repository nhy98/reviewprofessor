/**
 * @author thucvv
 */

// import -------------------------
export function setProductDataImport(data) {
  return { type: "SET_PRODUCT_DATA_IMPORT", data };
}

export function setMsgSuccessDataImport(success) {
  return { type: "SET_MSG_SUCCESS_DATA_IMPORT", success };
}
export function setMsgErrorDataImport(error) {
  return { type: "SET_MSG_ERROR_DATA_IMPORT", error };
}

export function resetDataImport() {
  return { type: "RESET_DATA_IMPORT" };
}
// export -------------------------
export function setProductDataExport(data) {
  return { type: "SET_PRODUCT_DATA_EXPORT", data };
}

// list file product import
export function setListFileProductImport(data) {
  return { type: "SET_LIST_FILE_PRODUCT_IMPORT", data };
}

export function setMsgSuccessListFileImport(success) {
  return { type: "SET_MSG_SUCCESS_LIST_FILE_IMPORT", success };
}
export function setMsgErrorListFileImport(error) {
  return { type: "SET_MSG_ERROR_LIST_FILE_IMPORT", error };
}

export function resetImportFileState() {
  return { type: "RESET_IMPORT_FILE_STATE" };
}

// -- set next
export function setNextPagingImport(start, end) {
  return { type: "SET_NEXT_PAGING_IMPORT", start, end };
}

export function setActivePagingImport(active) {
  return { type: "SET_ACTIVE_PAGING_IMPORT", active };
}

export function setActiveNextPagingImport(active) {
  return { type: "SET_ACTIVE_NEXT_PAGING_IMPORT", active };
}

//

export function setNextPagingListFileImport(start, end) {
  return { type: "SET_NEXT_PAGING_LIST_FILE_IMPORT", start, end };
}

export function setActivePagingListFileImport(active) {
  return { type: "SET_ACTIVE_PAGING_LIST_FILE_IMPORT", active };
}

export function setActiveNextPagingListFileImport(active) {
  return { type: "SET_ACTIVE_NEXT_PAGING_LIST_FILE_IMPORT", active };
}

export function setPageNumDataImport(page) {
  return { type: "SET_PAGE_NUM_DATA_IMPORT", page };
}
export function setPageNumListFileImport(page) {
  return { type: "SET_PAGE_NUM_LIST_FILE_IMPORT", page };
}

// ---- data export -------------------
export function setTotalPageDataExport(page) {
  return { type: "SET_TOTAL_PAGE_DATA_EXPORT", page };
}
export function addNewDataExport(data) {
  return { type: "ADD_NEW_DATA_EXPORT", data };
}
export function resetDataExport() {
  return { type: "RESET_DATA_EXPORT" };
}

export function setMsgSuccessDataExport(success) {
  return { type: "SET_MSG_SUCCESS_DATA_EXPORT", success };
}

export function setMsgErrorDataExport(error) {
  return { type: "SET_MSG_ERROR_DATA_EXPORT", error };
}
