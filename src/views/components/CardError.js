import React, { Component } from "react";

export default class CardError extends Component {
  render() {
    const { msg } = this.props;
    // console.log("Errorrrrrrr : " + msg);
    return !msg || msg.length == 0 ? null : (
      <ul>
        {msg.map((message, ind) => (
          <li
            hidden={message === "" ? true : false}
            key={ind.toString()}
            style={{ color: "red" }}
          >
            {message}
          </li>
        ))}
      </ul>
    );
  }
}
