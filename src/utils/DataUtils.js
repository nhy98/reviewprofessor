/**
 * @author thucvv
 */

var moment = require("moment");

// get date between day change
function getDateBetween(startDate, to) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(to);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

// get date between month change
function getMonthBetween(from, to) {
  var startDate = moment(from);
  var endDate = moment(to);

  var dates = [];
  endDate.subtract(1, "month"); //Substract one month to exclude endDate itself

  var month = moment(startDate); //clone the startDate
  while (month < endDate) {
    month.add(1, "month");
    dates.push(month.format("YYYY-MM"));
  }

  return dates;
}

function checkJsonValueExist(json, value) {
  for (let key in json) {
    if (typeof json[key] === "object") {
      return checkJsonValueExist(json[key], value);
    } else if (json[key] === value) {
      return true;
    }
  }
  return false;
}

// DD/MM/YYYY
function getDateFormatDDMMYYYY(date, symbol) {
  let from = new Date(date);
  if (!symbol) {
    symbol = "-";
  }
  let day =
    from.getDate() < 10
      ? "0".concat(from.getDate().toString())
      : from.getDate().toString();
  let month =
    from.getMonth() + 1 < 10
      ? "0".concat((from.getMonth() + 1).toString())
      : (from.getMonth() + 1).toString();
  let fromDate = day + symbol + month + symbol + from.getFullYear();
  return fromDate;
}

function getDateFormatYYMMDD(date, symbol) {
  let from = new Date(date);
  if (!symbol) {
    symbol = "-";
  }
  let fromDate = from
    .getFullYear()
    .toString()
    .concat(symbol)
    .concat(
      from.getMonth() + 1 < 10
        ? "0".concat((from.getMonth() + 1).toString())
        : (from.getMonth() + 1).toString()
    )
    .concat(symbol)
    .concat(
      from.getDate() < 10
        ? "0".concat(from.getDate().toString())
        : from.getDate().toString()
    );
  return fromDate;
}

function getDateFormatMMYYYY(date, symbol) {
  if (!symbol) {
    symbol = "-";
  }
  let from = new Date(date);
  let month =
    from.getMonth() + 1 < 10
      ? "0".concat((from.getMonth() + 1).toString())
      : (from.getMonth() + 1).toString();
  let fromDate = month + symbol + from.getFullYear().toString();
  return fromDate;
}

function getDateFormatYYYYMM(date) {
  let from = new Date(date);
  let fromDate = from
    .getFullYear()
    .toString()
    .concat("-")
    .concat(
      from.getMonth() + 1 < 10
        ? "0".concat((from.getMonth() + 1).toString())
        : (from.getMonth() + 1).toString()
    );
  return fromDate;
}

function convertTransChart2Line(data) {
  let xVal = [];
  let yVal1 = [];
  let yVal2 = [];

  for (let k in data) {
    xVal.push(k);
    if (data[k] === "" || data[k] === null) {
      yVal1.push(0);
      yVal2.push(0);
    } else {
      yVal1.push(data[k].TRANS_POINT);
      yVal2.push(data[k].TRANS_AMOUNT);
    }
  }

  let dataChart = {
    labels: xVal,
    data: [yVal1, yVal2]
  };

  return dataChart;
}

function convertDataCurrency(data) {
  let xVal = [];
  let yVal = [];

  for (let k in data) {
    xVal.push(k);
    if (data[k] === "" || data[k] === null) {
      yVal.push(0);
    } else {
      yVal.push(data[k].TOTAL_POINT);
    }
  }

  let dataChart = {
    labels: xVal,
    data: yVal
  };
  console.log(dataChart);

  return dataChart;
}

function convertRevenueChart2Line(data) {
  let xVal = [];
  let yVal1 = [];
  let yVal2 = [];

  for (let k in data) {
    xVal.push(k);
    if (data[k] === "" || data[k] === null) {
      yVal1.push(0);
      yVal2.push(0);
    } else {
      yVal1.push(data[k].POINT_AMOUNT);
      yVal2.push(data[k].BILL_AMOUNT);
    }
  }

  let dataChart = {
    labels: xVal,
    data: [yVal1, yVal2]
  };

  return dataChart;
}
// convert json data to array json data
function convertDataExcel(data, style) {
  let result = [];
  for (let i in data) {
    result.push({ value: data[i], style });
  }
  return result;
}

function setToDateIsCurrent(isCurrent, date) {
  if (isCurrent) {
    const currentDate = new Date();
    let to = dataUtil.getDateFormatYYMMDD(currentDate);
    return to;
  } else {
    const currentDate = new Date(date);
    let to = dataUtil.getDateFormatYYMMDD(currentDate);
    return to;
  }
}

function setFromDateDDMMYYY(isDay, numDate) {
  let to = new Date();
  if (isDay) {
    let toFrom = to.setDate(to.getDate() - numDate);
    return getDateFormatYYMMDD(toFrom);
  } else {
    let toFrom = to.setMonth(to.getMonth() - numDate);
    return getDateFormatYYMMDD(toFrom);
  }
}
// convert data sheet from excel

const dataUtil = {
  setToDateIsCurrent,
  setFromDateDDMMYYY,
  getDateFormatYYMMDD,
  getDateFormatYYYYMM,
  checkJsonValueExist,
  getDateBetween,
  getMonthBetween,
  convertTransChart2Line,
  convertRevenueChart2Line,
  convertDataCurrency,
  convertDataExcel,
  getDateFormatDDMMYYYY,
  getDateFormatMMYYYY
};

export default dataUtil;
// console.log(validateDateString("2012-02-30", "YYYY-MM-DD", false, null, null));
