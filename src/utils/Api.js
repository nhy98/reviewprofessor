// --------------API CONFIG -----------------------------------------
const API_LINK = "https://dbl-api-security.herokuapp.com/savis/categories";


const API_PATH = `${API_LINK}/api`;

const API_VERSION = "v1";
const API = `${API_PATH}/${API_VERSION}`;


// --------------AUTHORIZE-------------------------------------------
const AUTHORIZE = `${API}/auth/login`;

// --------------LOG_OUT-------------------------------------------
const LOG_OUT = `${API}/logout`;

// --------------RENEW_TOKEN-------------------------------------------
const RENEW_TOKEN = `${API}/renew_token`;

// --------------PRODUCT-------------------------------------------
const USERS = `${API}/users`;
// --------------IMPORT ------------------------------------------
const IMPORT = `${API}/import`;
// --------------REPORT-----------------------------------------
const REPORT = `${API}/reports`;
// --------------TRANSACTION-----------------------------------------
const TRANSACTION = `${REPORT}/total_transaction`;
// --------------CURRENCY-----------------------
const CURRENCY = `${REPORT}/circulation_money`;
// --------------CORRELATION-----------------------------------------
const CORRELATION = `${REPORT}/sale_pro`;
// --------------REVENUE--------------------------------------------
const REVENUE = `${REPORT}/revenue`;
// --------------BILL revenue-----------------------------------------------
const BILL = `${REPORT}/bill`;
// --------------HISTORY-------------------------------------------
const HISTORY = `${API}/history`;
// -------------USER------------------------------------------------
const TEACHERS = `${API}/teachers`;
// ------------BONUS------------------------------------------------
const BONUS = `${API}/bonus`;
// ------------BILL DETAILS ----------------------------------------
const BILL_DETAIL = `${API}/bill`;
const CLASSES = `${API}/classes`;
const REVIEW = `${API}/reviews`;


const REVIEWS = `${API}/reviews`;

// ------------LIST API ----------------------------------------------
const Api = {
  AUTHORIZE,
  LOG_OUT,
  RENEW_TOKEN,
  USERS,
  IMPORT,
  REPORT,
  TRANSACTION,
  CURRENCY,
  CORRELATION,
  REVENUE,
  TEACHERS,
  BONUS,
  BILL,
  HISTORY,

  BILL_DETAIL,
  CLASSES,
  REVIEW,

  REVIEWS
};

export default Api;
