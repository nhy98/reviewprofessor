import constants from "./Constants";
import i18n from "../views/components/I18n";

function isEmpty(data) {
  return data === null || data === undefined || data === "";
}

function getStatus(status) {
  switch (Number(status)) {
    case constants.WAITING:
      return i18n.t("layout_common.waiting");
    case constants.INPROGRESS:
      return i18n.t("layout_common.inprogress");
    case constants.SUCCESS:
      return i18n.t("layout_common.success");
    case constants.FAIL:
      return i18n.t("layout_common.fail");
    default:
      return i18n.t("layout_common.fail");
  }
}

function jsonCheckExistKey(json, key) {
  return json.hasOwnProperty(key);
}

function getDataLimit(number, data) {
  let newData = "";
  if (!this.isEmpty(data)) {
    const dataSplit = data.split(" ");
    let length = 0;
    for (let i = 0; i < dataSplit.length; i += 1) {
      length += dataSplit[i].length;
      if (i === 0 && length > number) {
        for (let j = 0; j < number; j += 1) {
          newData += dataSplit[i][j];
        }
        newData += " ...";
        break;
      } else if (length < number) {
        newData += `${dataSplit[i]} `;
      } else {
        newData += " ...";
        break;
      }
    }
  }
  return newData;
}

function isNaNDate(date) {
  const newDate = new Date(date);
  return (
    isNaN(newDate.getFullYear()) &&
    isNaN(newDate.getMonth()) &&
    isNaN(newDate.getDate())
  );
}

const stringUtils = {
  isEmpty,
  getStatus,
  jsonCheckExistKey,
  getDataLimit,
  isNaNDate
};

export default stringUtils;
