/**
 * @author thucvv
 */
import axios from "axios";
import {
  setProducts,
  setPageTotal,
  setError,
  setNext,
  setNextSearch,
  setActive,
  setProductSearch,
  setSearchActive,
  setErrorSearch,
  setPageSearchTotal,
  setMsgUpdateSuccess,
  setMsgUpdateError,
  setMsgDeleteSuccess,
  setMsgDeleteError,
  setMsgAddSuccess,
  setMsgAddError,
  setDataExportQr,
  setMsgExportQrSuccess,
  setMsgExportQrError,
  resetDataExportQr,
  setPageTotalExportQr,
  setMsgSuccessSearch,
  setSuccessGet,
  setPaging,
  setActiveNext,
  setActiveNextSearch,
  setDataExportQrFor
} from "../actions/ProductAction";
import Api from "../utils/Api";
import {
  errorGetProduct,
  errorAddProduct,
  errorUpdateProduct,
  errorDeleteProduct,
  errGetDataExport
} from "../utils/ResponseCode";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import validate from "../utils/validations/Validate";
import i18n from "../views/components/I18n";

// --- get product----
function getProducts(key, page, offset, limit, dispatch) {
  console.log(
    `key: ${key}  page: ${page}   offset: ${offset}   limit: ${-}`
  );

  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("reponse products ===== ");
        console.log(response);
        dispatch(setProducts(data.item));
        dispatch(setPageTotal(data.max_page));
        dispatch(setActive(page));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setProducts([]));
        dispatch(setPageTotal(1));
        dispatch(setActive(1));

        dispatch(setSuccessGet(i18n.t("response.no_content")));
      }
    })
    .catch(error => {
      console.log("error get product list=== ");
      console.log(error);
      errorGetProduct(error, setError, dispatch);
    });
}

// --- search product
function searchProducts(key, page, offset, limit, dispatch) {
  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("reponse products ===== ");
        console.log(response);
        dispatch(setProductSearch(data.item));
        dispatch(setPageSearchTotal(data.max_page));
        dispatch(setSearchActive(page));
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(setProductSearch([]));
        dispatch(setPageSearchTotal(1));
        dispatch(setSearchActive(1));

        dispatch(setMsgSuccessSearch(i18n.t("response.no_content")));
      }
    })
    .catch(error => {
      console.log("error get product list=== ");

      console.log(error);
      errorGetProduct(error, setErrorSearch, dispatch);
    });
}

// get Product

function getProduct(id, responseGetProduct, errorGetProduct) {
  axios({
    method: "GET",
    url: `${Api.PRODUCTS}/${id}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        // console.log("data get detail product");

        // console.log(data);
        // console.log(data.item[0]);
        responseGetProduct(data.item[0]);

        // return data.item[0];
      } else if (response.status === 204) {
        // return [];
        responseGetProduct([0]);
      }
    })
    .catch(error => {
      console.log("error get product update  ");
      console.log(error);
      errorGetProduct(error);
    });
}

// --- data export qr --------------------------
function getDataExportQR(key, page, offset, limit, dispatch) {
  dispatch(resetDataExportQr());
  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("reponse products data export===== ");
        console.log(response);
        let products = [];
        let newProduct = [];
        dispatch(setPageTotalExportQr(data.max_page));

        if (data.max_page === 1) {
          console.log("goi lan 1 maxpage =1");

          for (let i = 0; i < data.item.length; i++) {
            products.push({
              product_id: data.item[i].id,
              product: data.item[i].name,
              price: data.item[i].point
            });
            newProduct.push({
              product_id: data.item[i].id,
              product: data.item[i].name,
              price: data.item[i].point
            });
            // dispatch(
            //   setDataExportQr({
            //     product_id: data.item[i].id,
            //     product: data.item[i].name,
            //     price: data.item[i].point
            //   })
            // );
          }
          dispatch(setDataExportQr(products));
        }

        if (data.max_page > 1) {
          console.log("goi lan 2 maxpage > 1");
          for (let i = 0; i < data.item.length; i++) {
            newProduct.push({
              product_id: data.item[i].id,
              product: data.item[i].name,
              price: data.item[i].point
            });
          }

          dispatch(setDataExportQrFor(newProduct));

          for (let i = 2; i <= data.max_page; i++) {
            // getDataExportQRFor("", i, i * limit - 1, limit, dispatch);
            let product = [];
            if (i <= data.max_page) {
              // `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
              axios({
                method: "GET",
                url: `${Api.PRODUCTS}?key=${key}&offset=${(i - 1) *
                  limit}&limit=${limit}`
              })
                .then(response => {
                  if (response.status === 200) {
                    const { data } = response.data;
                    console.log("reponse products data export===== ");
                    console.log(response);

                    for (let i = 0; i < data.item.length; i++) {
                      product.push({
                        product_id: data.item[i].id,
                        product: data.item[i].name,
                        price: data.item[i].point
                      });
                    }
                    dispatch(setDataExportQrFor(product));
                  } else if (response.status === 204) {
                    console.log("no content");
                  }
                })
                .catch(error => {
                  console.log("error get product data import === ");
                  errGetDataExport(error, setMsgExportQrError, dispatch);
                  console.log(error);
                });
            } else {
              // dispatch(setDataExportQr(newProduct));
            }
          }
        }
      } else if (response.status === 204) {
        console.log("no content");
        dispatch(
          setMsgExportQrSuccess({
            code: "success",
            message: i18n.t("response.no_content")
          })
        );
      }
    })
    .catch(error => {
      console.log("error get product data import === ");
      errGetDataExport(error, setMsgExportQrError, dispatch);
      console.log(error);
    });
}

function getDataExportQRFor(key, page, offset, limit, dispatch) {
  axios({
    method: "GET",
    url: `${Api.PRODUCTS}?key=${key}&offset=${offset}&limit=${limit}`
  })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        console.log("reponse products data export===== ");
        console.log(response);

        for (let i = 0; i < data.item.length; i++) {
          dispatch(
            setDataExportQr({
              product_id: data.item[i].id,
              product: data.item[i].name,
              price: data.item[i].point
            })
          );
        }
      } else if (response.status === 204) {
        console.log("no content");
      }
    })
    .catch(error => {
      console.log("error get product data import === ");
      errGetDataExport(error, setMsgExportQrError, dispatch);
      console.log(error);
    });
}
// ---- update product---------------
function updateProduct(product, xKey, dispatch) {
  let valid = false;
  let msgError = i18n.t("layout_common.not_allow_empty");
  if (
    validate.validNumber(product.id.toString(), false) &&
    validate.validStringMaxLength(product.id.toString(), false, 10)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("layout_common.id"))
      })
    );
    return;
  }

  if (validate.validStringMaxLength(product.code.toString(), false, 100)) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.code"))
      })
    );
    return;
  }

  if (validate.validStringMaxLength(product.name, false, 100)) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.product"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.price.toString(), false, 10) &&
    validate.validNumber(product.price.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.price"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.amount.toString(), false, 10) &&
    validate.validNumber(product.amount.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.amount"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.point.toString(), false, 10) &&
    validate.validNumber(product.point.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgUpdateError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("layout_common.point"))
      })
    );
    return;
  }

  if (valid) {
    console.log("edit product >>>>> ");

    const idEncrypt = aesCryptoJs.encrypt(product.id.toString(), xKey);
    const idEncode = encodeURIComponent(idEncrypt);
    const data = {
      code: product.code,
      name: product.name,
      availableTotal: product.amount,
      price: product.price,
      point: product.point,
      productType: product.productType
    };
    axios({
      method: "PUT",
      url: `${Api.PRODUCTS}?product_id=${idEncode}`,
      data: { data: aesCryptoJs.encrypt(JSON.stringify(data), xKey) }
    })
      .then(response => {
        console.log("log ====== = update product ==== ");
        console.log(response);
        if (response.status === 200) {
          dispatch(
            setMsgUpdateSuccess({
              code: "success",
              message: i18n.t("response.success")
            })
          );
        }
      })
      .catch(error => {
        console.log("error update product =========");
        console.log(error);
        errorUpdateProduct(error, setMsgUpdateError, dispatch);
      });
  }
}

// --- add new product
function addNewProduct(product, xKey, dispatch, callback) {
  let valid = false;
  let msgError = i18n.t("layout_common.not_allow_empty");

  if (validate.validStringMaxLength(product.name, false, 100)) {
    valid = true;
  } else {
    dispatch(
      setMsgAddError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.product"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.price.toString(), false, 10) &&
    validate.validNumber(product.price.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgAddError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.price"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.amount.toString(), false, 10) &&
    validate.validNumber(product.amount.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgAddError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("bill.amount"))
      })
    );
    return;
  }

  if (
    validate.validStringMaxLength(product.point.toString(), false, 10) &&
    validate.validNumber(product.point.toString(), false)
  ) {
    valid = true;
  } else {
    dispatch(
      setMsgAddError({
        code: "error",
        message: msgError.replace("[field]", i18n.t("layout_common.point"))
      })
    );
    return;
  }

  if (valid) {
    console.log("cal axios add product =============== ");
    const dataEnc = aesCryptoJs.encrypt(JSON.stringify(product), xKey);
    console.log("data ==== " + dataEnc);

    axios({
      method: "POST",
      url: Api.PRODUCTS,
      data: { data: dataEnc }
    })
      .then(response => {
        if (response.status === 201) {
          callback(true);
          dispatch(
            setMsgAddSuccess({
              code: "success",
              message: i18n.t("response.success")
            })
          );
        }
      })
      .catch(error => {
        callback(false);
        console.log("error add product ============== ");
        console.log(error);
        errorAddProduct(error, setMsgAddError, dispatch);
      });
  }
}

// --- delete product------------------
function deleteProduct(id, xKey, dispatch) {
  if (validate.isNumber(id, false, setMsgDeleteError, dispatch)) {
    const idEncrypt = aesCryptoJs.encrypt(id.toString(), xKey);
    const idEncode = encodeURIComponent(idEncrypt);
    axios({
      method: "DELETE",
      url: `${Api.PRODUCTS}?product_id=${idEncode}`
    })
      .then(response => {
        console.log("log ====== = DELETE product ==== ");
        console.log(response);

        dispatch(
          setMsgDeleteSuccess({
            code: "success",
            message: i18n.t("response.success")
          })
        );
        window.location.reload();
      })
      .catch(error => {
        console.log("error delete product =========");
        console.log(error);
        // dispatch(setMsgDeleteError({ code: "code", message: "Error" }));
        errorDeleteProduct(error, setMsgDeleteError, dispatch);
      });
  } else {
    dispatch(setMsgDeleteError({ code: "error", message: "Error ID" }));
  }
}

function handleNext(start, end, total, dispatch) {
  if (end <= total) {
    dispatch(setNext(start + 1, end + 1));
  }
}
function handlePrev(start, end, dispatch) {
  if (start >= 1) {
    dispatch(setNext(start - 1, end - 1));
  }
}

function handleNextActive(active, dispatch) {
  dispatch(setActiveNext(active));
}

function handleNextActiveSearch(active, dispatch) {
  dispatch(setActiveNextSearch(active));
}

function handleNextSearch(start, end, total, dispatch) {
  if (end <= total) dispatch(setNextSearch(start + 1, end + 1));
}
function handlePrevSearch(start, end, dispatch) {
  if (start >= 1) dispatch(setNextSearch(start - 1, end - 1));
}
const productService = {
  handleNextActiveSearch,
  getProducts,
  handleNextSearch,
  handlePrevSearch,
  handleNext,
  handlePrev,
  searchProducts,
  updateProduct,
  deleteProduct,
  addNewProduct,
  getDataExportQR,
  getProduct,
  handleNextActive
};

export default productService;
