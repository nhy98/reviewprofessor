import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import Api from "../../utils/Api";
import '../../css/stylesheet.css';


const axios = require('axios');

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.userId}`
//localhost:3000/ú
  return (
    <tr key={user.userId}>
      <td><img src="https://pbs.twimg.com/media/D9EYEM6UYAEOCIn.jpg" class="rounded-circle md-avatar"/></td>
      <td><Link to={userLink}>{user.username}</Link></td>
      <td>{user.email}</td>
      <td>{user.mobile}</td>
    </tr>
  )
}

class Users extends Component {
    constructor(props) {
      super(props);

      this.state = {
          isloaded: false,
          users: [],
      };
    }

    componentDidMount() {
       axios.get(`${Api.USERS}`)
       .then(response => response.data)
       .then(data => this.setState({ isloaded: true, users : data.content}))
      .catch((error) => {
        console.log(error);
      });
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    var {  isloaded, users } = this.state;

    if (!isloaded) {
        return (
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        )
    }
    else {
        return (
          <div className="animated fadeIn">
                <Card className="border-0 shadow-box col-8 mt-5 offset-2">
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">name</th>
                          <th scope="col">email</th>
                          <th scope="col">phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user =>
                          <UserRow key={user.userId} user={user}/>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
          </div>
        )
      }
  }
}
export default Users;
