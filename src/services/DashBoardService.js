import revenueService from "./RevenueService";
import transactionService from "./TransactionService";
import currencyService from "./CurrencyService";
import correlatioinService from "./CorrelationService";

function initDashboardData(from, to, type, xKey, dispatch) {
  currencyService.getCurrency(from, to, type, xKey, dispatch);
  revenueService.getRevenue(from, to, type, xKey, dispatch);
  transactionService.getTransaction(from, to, type, xKey, dispatch);
  correlatioinService.search(from, to, xKey, dispatch);
}

function getDashBoardData(from, to, type, xKey, dispatch, kill) {
  if (kill === 0) {
    this.inter = setInterval(function() {
      initDashboardData(from, to, type, xKey, dispatch);
    }, 5000);
  } else {
    console.log("getDashBoardData clear interval");
    clearInterval(this.inter);
  }
}

const dashboardService = { getDashBoardData, initDashboardData };

export default dashboardService;
