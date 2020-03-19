import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter } from 'reactstrap';
import Api from "../../utils/Api";
import '../../css/stylesheet.css';


const axios = require('axios');


class User extends Component {
    constructor(props) {
      super(props);

      this.state = {
          isloaded: false,
          username: null,
          fullname: null,
          address: null,
          email: null,
          mobile: null,
          info: null,
      };
    }

    componentDidMount() {
        axios.get(`${Api.USERS}/${this.props.match.params.id}`)
        .then(response => response.data)
        .then(data => this.setState({
            isloaded: true,
            username: data.username,
            fullname: data.fullname,
            address: data.address,
            email: data.email,
            mobile: data.mobile,
            info: data.information,
        }))
       .catch((error) => {
         console.log(error);
       });
     }

  render() {
    var {  isloaded, username, fullname, address, email, mobile, info } = this.state;

    if (!isloaded) {
          return (
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          )
      }
    else {
    return (
      <div className="animated fadeIn">
            <Card className="col-6 shadow-box mt-5 offset-3">
                <CardHeader>
                <img src="https://pbs.twimg.com/media/D9EYEM6UYAEOCIn.jpg" class="rounded-circle md-avatar"/>
                 <strong className="mx-3">{username}</strong>
                </CardHeader>
              <CardBody >
              <div className="p-0 col-3 float-left"><strong>Fullname:</strong></div>
              <div>{fullname === null ? "No Information" : fullname}</div>
               <div className="p-0 col-3 float-left"><strong>Info:</strong></div>
               <div>{info === null ? "No Information" : info}</div>
               <div className="p-0 col-3 float-left"><strong>Address:</strong></div>
               <div>{address === null ? "No Information" : address}</div>
               <div className="p-0 col-3 float-left"><strong>Email:</strong></div>
               <div>{email}</div>
               <div className="p-0 col-3 float-left"><strong>Mobile:</strong></div>
               <div>{mobile === null ? "No Information" : mobile}</div>
              </CardBody>
              </Card>
      </div>
    )
  }
}
}
export default User;
