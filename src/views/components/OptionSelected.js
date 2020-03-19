import React, { Component } from "react";
import { Col, Row, Button, ButtonToolbar, Input } from "reactstrap";
import i18n from "../components/I18n";

export default class OptionSelected extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "coconut" };
  }

  handleChange(event) {
    // this.setState({value: event.target.value});
    this.props.handleChange(event);
  }

  render() {
    const { data, id } = this.props;
    return (
      <div>
        <Input
          type="select"
          name="select"
          id={id}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
        >
          <option value="-10">{i18n.t("bonus.pl_select")}</option>
          {data.map((option, i) => (
            <option key={i.toString()} value={option.code}>
              {option.value}
            </option>
          ))}
        </Input>
      </div>
    );
  }
}
