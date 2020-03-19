/**
 * @author thucvv
 */

import axios from "axios";
import Api from "../utils/Api";
import {
  setProductDataImport,
  setListFileProductImport,
  setActivePagingImport,
  setActivePagingListFileImport,
  setNextPagingImport,
  setNextPagingListFileImport,
  setPageNumDataImport,
  resetDataExport,
  addNewDataExport,
  setTotalPageDataExport,
  resetDataImport,
  setMsgSuccessDataImport,
  setMsgErrorDataImport,
  setMsgErrorListFileImport,
  setMsgSuccessListFileImport,
  setMsgSuccessDataExport,
  setMsgErrorDataExport,
  setPageNumListFileImport,
  setActiveNextPagingListFileImport
} from "../actions/ImportFileAction";
import validate from "../utils/validations/Validate";
import {
  errorImportFile,
  errorImportListFileData,
  errGetDataExport
} from "../utils/ResponseCode";
import i18n from "../views/components/I18n";
import stringUtils from "../utils/StringUtils";

function importFile() {
  axios({
    method: "POST",
    url: "",
    data: ""
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

function getDataImportFile(page, offset, limit, dispatch) {
  dispatch(setActivePagingImport(page));
}

/**
 * GET LIST FILE IMPORT ------------
 * @param {*} key
 * @param {*} page
 * @param {*} offset
 * @param {*} limit
 * @param {*} from
 * @param {*} to
 * @param {*} dispatch
 */
function getListFileImport(key, page, offset, limit, from, to, dispatch) {
  console.log("from service === " + from);
  console.log("to service === " + to);
  let isValidFrom = false,
    isValidTo = false,
    valid = false;
  isValidFrom = validate.validateDateString(
    from,
    "YYYY-MM-DD",
    true,
    setMsgErrorListFileImport,
    dispatch
  );
  isValidTo = validate.validateDateString(
    to,
    "YYYY-MM-DD",
    true,
    setMsgErrorListFileImport,
    dispatch
  );

  if (
    !stringUtils.isEmpty(from) &&
    !stringUtils.isEmpty(to) &&
    new Date(from) > new Date(to)
  ) {
    valid = false;
    dispatch(
      setMsgErrorListFileImport({
        code: "error",
        message: i18n.t("error_validate.EV001")
      })
    );
  } else {
    valid = true;
  }

  if (isValidFrom && isValidTo && valid) {
    axios({
      method: "GET",
      url: `${Api.IMPORT}?from=${from}&to=${to}&offset=${offset}&limit=${limit}`
    })
      .then(response => {
        if (response.status === 200) {
          const { data } = response.data;
          console.log("reponse products ===== ");
          console.log(response);
          console.log("data ============= list file import ");
          console.log(data);

          dispatch(setListFileProductImport(data.item));
          dispatch(setActivePagingListFileImport(page));
          dispatch(setPageNumListFileImport(data.max_page));
        } else if (response.status === 204) {
          console.log("no content");
          dispatch(setListFileProductImport([]));
          dispatch(setActivePagingListFileImport(page));
          // dispatch(
          //   setMsgSuccessListFileImport({
          //     code: "success",
          //     message: i18n.t("response.no_content")
          //   })
          // );
        }
      })
      .catch(error => {
        console.log("error get list file import ======= ");
        console.log(error);
        errorImportListFileData(error, setMsgErrorListFileImport, dispatch);
      });
  }
}

function nextPageImport(start, end, total, dispatch) {
  if (end < total) dispatch(setNextPagingImport(start + 1, end + 1));
}

function nextActivePageImport(active, dispatch) {
  dispatch(setActivePagingImport(active));
}

function handlePrevDataImport(start, end, dispatch) {
  if (start > 1) dispatch(setNextPagingImport(start - 1, end - 1));
}
function nextPageListFileImport(start, end, total, dispatch) {
  if (end < total) dispatch(setNextPagingListFileImport(start + 1, end + 1));
}

function nexActivetPageListFileImport(active, dispatch) {
  dispatch(setActiveNextPagingListFileImport(active));
}

function prevPageListFileImport(start, end, dispatch) {
  if (start > 1) dispatch(setNextPagingListFileImport(start - 1, end - 1));
}

function resetDataExportFunc(dispatch) {
  dispatch(resetDataExport());
}

function getDataExport(key, page, offset, limit, dispatch) {
  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("reponse products data export===== ");
        console.log(response);
        // dispatch(addNewDataExport(data.item));
        dispatch(setTotalPageDataExport(data.max_page));
        if (data.max_page > 0) {
          for (let i = 1; i <= data.max_page; i++) {
            getDataExportFor("", i, (i - 1) * limit, limit, dispatch);
          }
        }
      } else if (response.status === 204) {
        console.log("no content");

        // dispatch(
        //   setMsgSuccessDataExport({
        //     code: "success",
        //     message: i18n.t("response.no_content")
        //   })
        // );
      }
    })
    .catch(error => {
      console.log("error get product data import === ");
      errGetDataExport(error, setMsgErrorDataExport, dispatch);
      console.log(error);
    });
}

function getDataExportFor(key, page, offset, limit, dispatch) {
  console.log("get product export :::: offset : ", offset, "   limit: ", limit);

  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("offset get data export  ", offset);
        // console.log(response);
        dispatch(addNewDataExport(data.item));
      } else if (response.status === 204) {
        console.log("no content");
      }
    })
    .catch(error => {
      console.log("error get product data import === ");
      errGetDataExport(error, setMsgErrorDataExport, dispatch);
      console.log(error);
    });
}

function setDataImport(data, dispatch) {
  dispatch(setProductDataImport(data));
  dispatch(setPageNumDataImport(data.length));
  dispatch(setActivePagingImport(1));
}

/**
 * Import Excel file
 */
function handleProductImport(data, dispatch) {
  console.log("data import service >>>>>>>> ");
  console.log(data);

  let valid = true;
  for (let i = 0; i < data.item.length; i++) {
    if (
      !validate.validStringMaxLength(
        data.item[i].amount.toString(),
        false,
        10
      ) ||
      !validate.validNumber(data.item[i].amount, true) ||
      !validate.validStringMaxLength(
        data.item[i].product_id.toString(),
        false,
        10
      ) ||
      !validate.validNumber(parseInt(data.item[i].product_id), true)
      // !validate.validateStringMaxLength(
      //   data.item[i].product_id.toString(),
      //   false,
      //   10,
      //   setMsgErrorDataImport,
      //   dispatch
      // ) ||
      // !validate.isNumber(
      //   parseInt(data.item[i].product_id),
      //   true,
      //   setMsgErrorDataImport,
      //   dispatch
      // )
    ) {
      valid = false;
      dispatch(
        setMsgErrorDataImport({
          code: "error",
          message: i18n.t("layout_manager_product.err_id_amount")
        })
      );
      break;
    }
  }

  if (valid) {
    axios({
      method: "POST",
      url: `${Api.IMPORT} `,
      data: { data }
    })
      .then(response => {
        if (response.status === 201) {
          const { data } = response.data;
          console.log("reponse products data export===== ");
          console.log(response);
          console.log(data);
          const message = i18n.t("response.success");

          dispatch(setMsgSuccessDataImport({ code: "success", message }));
        }
      })
      .catch(error => {
        console.log("error get product data import === ");

        console.log(error);
        errorImportFile(error, setMsgErrorDataImport, dispatch);
      });
  }
}

function handleResetDataImport(dispatch) {
  dispatch(resetDataImport());
}

const importFileService = {
  handleProductImport,
  nextPageImport,
  handlePrevDataImport,
  nextPageListFileImport,
  prevPageListFileImport,
  getDataImportFile,
  getListFileImport,
  getDataExport,
  resetDataExportFunc,
  importFile,
  setDataImport,
  handleResetDataImport,
  nextActivePageImport,
  nexActivetPageListFileImport
};

export default importFileService;
