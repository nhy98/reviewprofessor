/**
 * @author thucvv
 */
import axios from "axios";
import aesCryptoJs from "../utils/cryptographics/AesCryptoJs";
import validate from "../utils/validations/Validate";
import Api from "../utils/Api";
import {
  setBonusUser,
  addAUserBonus,
  setMsgErrorBonusUser,
  setMsgSuccessBonusUser,
  setDataImportBonus,
  setTotalPageDataImportBonus,
  removeUserBonus
} from "../actions/BonusAcion";
import { errBonus } from "../utils/ResponseCode";
import i18n from "../views/components/I18n";

function setUserToBonus(users, dispatch) {
  dispatch(setBonusUser(users));
}
function addAUserToBonus(user, dispatch) {
  dispatch(addAUserBonus(user));
}

function setBonusDataImport(data, dispatch) {
  dispatch(setDataImportBonus(data));
  dispatch(setTotalPageDataImportBonus(data.length));
}

function deleteUserBonus(index, dispatch) {
  dispatch(removeUserBonus(index));
}

function bonusUsers(data, xKey, callback, dispatch) {
  let valid = true;
  callback(false);
  if (
    data.bonus_type !== 0 &&
    data.point !== 0 &&
    validate.isNumber(data.point, false, setMsgErrorBonusUser, dispatch) &&
    data.users.length > 0
  ) {
    for (let i = 0; i < data.users.length; i++) {
      if (
        !validate.isNumber(
          data.users[i],
          false,
          setMsgErrorBonusUser,
          dispatch
        ) ||
        !validate.validateStringLength(
          data.users[i],
          false,
          4,
          setMsgErrorBonusUser,
          dispatch
        )
      ) {
        dispatch(
          setMsgErrorBonusUser({
            code: "EV000",
            message: i18n.t("error_validate.EV000")
          })
        );
        valid = false;
        break;
      }
    }
  } else {
    dispatch(
      setMsgErrorBonusUser({
        code: "EV000",
        message: i18n.t("error_validate.EV000")
      })
    );
    valid = false;
  }

  if (valid) {
    axios({
      method: "POST",
      url: `${Api.BONUS}`,
      data: { data: aesCryptoJs.encrypt(JSON.stringify(data), xKey) }
    })
      .then(response => {
        console.log("response bonus point ============== ");
        console.log(response);
        callback(true);

        if (response.status === 201) {
          console.log("reponse bonus users  ===== ");
          console.log(response);
          console.log("data =================== ");

          dispatch(
            setMsgSuccessBonusUser({
              code: "success",
              message: i18n.t("response.success")
            })
          );
        }
      })
      .catch(error => {
        console.log("error update user list=== ");
        console.log(error);
        errBonus(error, setMsgErrorBonusUser, dispatch);
      });
  }
}

const userService = {
  setUserToBonus,
  addAUserToBonus,
  bonusUsers,
  setBonusDataImport,
  deleteUserBonus
};

export default userService;
