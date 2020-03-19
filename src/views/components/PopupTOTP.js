import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import i18n from "../components/I18n";
import Popup from "reactjs-popup";
import bonusDetailService from "../../services/BonusDetailInfoService";
import { connect } from "react-redux";
import CardError from "./CardError";
import { setPopupApproved } from "../../actions/BonusAcion";
import msgErrorAction from "../../actions/MessageErrorAction";

class PopupTOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden_loading: true,
      disable_button: false,
      otp_value: "",
      erorList: []
    };
  }

  closeModal() {
    // this.setState({ open: true })
    const { dispatch } = this.props;
    //Reset state
    this.state.hidden_loading = true;
    this.state.disable_button = false;
    dispatch(setPopupApproved(false));
    dispatch(msgErrorAction.setErrorCode([]));
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.hidden_loading = true;
  }

  // Request to server to approved bonus
  approved(bonusIdArr) {
    const { dispatch, xKey } = this.props;
    console.log(
      "approved -- OTP: " +
        this.state.otp_value.trim() +
        "length: " +
        this.state.otp_value.trim().length
    );
    dispatch(msgErrorAction.setErrorCode([]));
    const format = require("string-format");
    if (!this.state.otp_value || this.state.otp_value.trim().length == 0) {
      let msgError = format(i18n.t("msg_error.E40001"), "OTP");
      this.setState({
        erorList: [msgError]
      });
    } else if (this.state.otp_value.trim().length != 6) {
      let msgError = format(i18n.t("msg_error.E40003"), "OTP", "6");
      this.setState({
        erorList: [msgError]
      });
    } else {
      this.state.hidden_loading = false;
      this.state.disable_button = true;
      bonusDetailService.approvedBonus(
        dispatch,
        bonusIdArr,
        this.state.otp_value.trim(),
        xKey
      );
    }

    // dispatch(setPopupApproved(false));
    // this.setState({ open: true })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
    this.state.erorList = [];
  }

  render() {
    const { status, bonusIdArr, errorCodeLst, isShowPopup } = this.props;
    // let isOpen = false;
    // if (status && !this.state.open) {
    //     isOpen = true;
    // } else {
    //     isOpen = false;
    // }
    const format = require("string-format");
    for (let code in errorCodeLst) {
      this.state.hidden_loading = true;
      this.state.disable_button = false;
      let msgCode = "msg_error." + errorCodeLst[code].code;
      let errorMsg = "";
      if (errorCodeLst[code].field) {
        console.log("code : " + msgCode);
        errorMsg = format(
          i18n.t(msgCode),
          errorCodeLst[code].field.toUpperCase(),
          "YYYY-MM-DD"
        );
      } else {
        errorMsg = i18n.t(msgCode);
      }
      this.state.erorList.push(errorMsg);
    }

    return (
      <div className={"otp-with"}>
        <Popup
          open={isShowPopup}
          closeOnDocumentClick
          onClose={this.closeModal.bind(this)}
          position="right center"
        >
          <div>
            <a className="close" onClick={this.closeModal.bind(this)}>
              &times;
            </a>
            <CardError msg={this.state.erorList} />
            <div>
              <h2>{i18n.t("bonus.popupTOTPHeader")}</h2>
              <Input
                type="text"
                id="otp"
                name="otp"
                onChange={e => {
                  this.setState({
                    ...this.state.otp_value,
                    otp_value: e.target.value
                  });
                }}
              />
            </div>
            <div>
              <Button
                className={"button-size"}
                type="button"
                color="primary"
                onClick={this.approved.bind(this, bonusIdArr)}
                disabled={this.state.disable_button}
              >
                {i18n.t("layout_common.approve")}
              </Button>
              <label
                className={"maggin-with"}
                hidden={this.state.hidden_loading}
                style={{ color: "red" }}
              >
                {" "}
                Loading......
              </label>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default connect(state => ({
  xKey: state.LoginReducer.xKey,
  errorCodeLst: state.MessageErrorReducer.errorCodes,
  msgErrorLst: state.MessageErrorReducer.msgErrors,
  isShowPopup: state.BonusReducer.bonuses.showPopupApproved
}))(PopupTOTP);
