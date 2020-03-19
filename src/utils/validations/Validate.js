/**
 * @author thucvv
 *
 */

import i18n from "../../views/components/I18n";
import stringUtils from "../StringUtils";
var moment = require("moment");

function validateStringMaxLength(
  value,
  isNull,
  maxLength,
  msgAddFunc,
  dispatch
) {
  value = value.trim();
  if (isNull) {
    if (value === "") {
      return true;
    } else {
      if (value.length < maxLength) {
        return true;
      } else {
        const message = i18n.t("error_validate.EV000");

        dispatch(msgAddFunc({ code: "EV000", message }));
        return false;
      }
    }
  } else {
    if (value.length > 0 && value.length <= maxLength) {
      return true;
    } else {
      const message = i18n.t("error_validate.EV000");

      dispatch(msgAddFunc({ code: "EV000", message }));
      return false;
    }
  }
}

function validStringMaxLength(value, isNull, maxLength) {
  value = value.trim();
  if (isNull) {
    if (value === "") {
      return true;
    } else {
      if (value.length < maxLength) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (value.length > 0 && value.length <= maxLength) {
      return true;
    } else {
      return false;
    }
  }
}

function validateStringLength(value, isNull, length, msgAddFunc, dispatch) {
  value = value.trim();
  if (isNull) {
    if (value === "") {
      return true;
    } else {
      if (value.length === length) {
        return true;
      } else {
        const message = i18n.t("error_validate.EV000");

        dispatch(msgAddFunc({ code: "EV000", message }));
        return false;
      }
    }
  } else {
    if (value.length > 0 && value.length === length) {
      return true;
    } else {
      const message = i18n.t("error_validate.EV000");

      dispatch(msgAddFunc({ code: "EV000", message }));
      return false;
    }
  }
}

function isNumber(number, isNull, msgAction, dispatch) {
  const regex = /^\d+$/;
  if (isNull) {
    if (number === "") {
      return true;
    } else {
      if (regex.test(number)) {
        return true;
      } else {
        const message = i18n.t("error_validate.EV004");

        dispatch(msgAction({ code: "EV004", message }));
        return false;
      }
    }
  } else {
    if (regex.test(number)) {
      return true;
    } else {
      const message = i18n.t("error_validate.EV004");

      dispatch(msgAction({ code: "EV004", message }));
      return false;
    }
  }
}

function validNumber(number, isNull) {
  const regex = /^\d+$/;
  if (isNull) {
    if (number === "" || Number(number) === 0) {
      return true;
    } else {
      if (regex.test(number)) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  }
}

function validateDateString(date, dateFormat, isNull, msgAction, dispatch) {
  if (isNull) {
    if (stringUtils.isEmpty(date)) {
      return true;
    } else {
      if (moment(date, dateFormat, true).isValid()) {
        return true;
      } else {
        console.log("data format ???>>>>>: ", dateFormat);

        const message = i18n.t("error_validate.EV005");

        dispatch(msgAction({ code: "EV005", message }));
        return false;
      }
    }
  } else {
    if (moment(date, dateFormat, true).isValid()) {
      return true;
    } else {
      const message = i18n.t("error_validate.EV005");

      dispatch(msgAction({ code: "EV005", message }));
      return false;
    }
  }
}

function validateDateWithFormat(date, format, isNull) {
  if (date || date.length == 0) {
    if (isNull) {
      return true;
    } else {
      return false;
    }
  } else {
    if (moment(date, format, true).isValid()) {
      return true;
    } else {
      return false;
    }
  }
}

const validate = {
  validateStringMaxLength,
  isNumber,
  validNumber,
  validateDateString,
  validateStringLength,
  validateDateWithFormat,
  validStringMaxLength
};

export default validate;
