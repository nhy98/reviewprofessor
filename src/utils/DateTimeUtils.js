var moment = require("moment");
function converDateToString(date) {
    if (date === null) {
        return null;
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (null !== year || null !== month || null !== day) {
        return year.toString() + "-" + month.toString() + "-" + day.toString();
    }
}

function validateFromTo(from, to) {
    let fromDate = moment(from);
    let toDate = moment(to);
    return fromDate.isAfter(toDate);
}

const DateTimeUtils = {
    converDateToString,
    validateFromTo
  }
  
  export default DateTimeUtils;
  