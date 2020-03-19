import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import i18n from "../components/I18n";

function convertPagenum(start, end, total) {
  let arr = [];
  if (total >= 1 && total < end) {
    for (let j = 1; j <= total; j++) {
      arr.push(j);
    }
  } else if (start >= 1 && start <= end && end <= total) {
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }
  return arr;
}

class PaginationBox extends Component {
  handlePageClick(page) {
    this.props.handlePageClick(page);
  }
  render() {
    const { end, start, total, active } = this.props;

    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink onClick={this.props.handlePrev} previous tag="button">
            {i18n.t("paging.pre")}
          </PaginationLink>
        </PaginationItem>

        {convertPagenum(start, end, total).map((page, index) => (
          <PaginationItem active={page === active} key={index.toString()}>
            <PaginationLink
              onClick={this.handlePageClick.bind(this, page)}
              tag="button"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink onClick={this.props.handleNext} next tag="button">
            {i18n.t("paging.next")}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

export default PaginationBox;
