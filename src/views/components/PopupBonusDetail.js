import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import i18n from "../components/I18n";
import { Col, Row, Button, ButtonToolbar } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-table/react-table.css";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { setPopupBonusDetail, setBonusDetail } from "../../actions/BonusAcion";

class PopupBonusDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(setPopupBonusDetail(false));
    dispatch(setBonusDetail([]));
  }

  statusFormat(cell, row) {
    let statusFlg = row.status;
    let statusMsg = "";
    switch (statusFlg) {
      case -1:
        statusMsg = i18n.t("bonus.Failure");
        break;
      case 0:
        statusMsg = i18n.t("bonus.Waiting");
        break;
      case 1:
        statusMsg = i18n.t("bonus.Inprocess");
        break;
      case 2:
        statusMsg = i18n.t("bonus.Success");
        break;
      default:
        break;
    }
    return <i>{statusMsg}</i>;
  }

  render() {
    const {
      isShowPopup,
      bonusId,
      bonusName,
      description,
      point,
      role
    } = this.props;
    const { bonuses } = this.props;
    console.log("BonusListTab : " + bonuses);
    const bonusList = bonuses.bonusDetail ? bonuses.bonusDetail : [];

    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        }
      ],
      hideSizePerPage: true,
      sizePerPage: 5, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "bottom" // default is bottom, top and both is all available
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };

    return (
      <div>
        <Popup
          open={isShowPopup}
          closeOnDocumentClick
          onClose={this.closeModal.bind(this)}
        >
          <div>
            <a className="close" onClick={this.closeModal.bind(this)}>
              &times;
            </a>
            <div>
              <h>{bonusName}</h>
              <p>
                <Row>
                  <Col>{i18n.t("bonus.description") + ":"}</Col>
                  <Col>{description}</Col>
                </Row>
              </p>
              <p>
                <Row>
                  <Col>{i18n.t("bonus.descrbonusPointiption") + ":"}</Col>
                  <Col>{point}</Col>
                </Row>
              </p>
            </div>
            <div>
              {bonusList.length > 0 ? (
                <BootstrapTable
                  data={bonusList}
                  pagination={true}
                  options={options}
                  striped
                  hover
                  search
                  searchPlaceholder="input something..."
                >
                  <TableHeaderColumn
                    isKey
                    dataField="memberCode"
                    dataSort={true}
                  >
                    {i18n.t("bonus.memberCode")}
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="fullName" dataSort={true}>
                    {i18n.t("bonus.fullName")}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="status"
                    dataSort={true}
                    dataFormat={this.statusFormat}
                  >
                    {i18n.t("bonus.status")}
                  </TableHeaderColumn>
                </BootstrapTable>
              ) : null}
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}
export default connect(state => ({
  users: state.ManagerUserReducer.users,
  bonus: state.BonusReducer.bonus,
  xKey: state.LoginReducer.xKey,
  bonuses: state.BonusReducer.bonuses,
  isShowPopup: state.BonusReducer.bonuses.showPopupDetail
}))(PopupBonusDetail);
