import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Api from "../../utils/Api";
import '../../css/stylesheet.css';


const axios = require('axios');



class AddTeacher extends Component {
    constructor(props) {
      super(props);

      this.onDelete = this.onDelete.bind(this);
      this.state = {
          isloaded: false,
          reports: [],
          id: [],
      };
    }


    onDelete = id => {
      axios.delete(`${Api.REPORT}/${id}`)
      .then(response => console.log(response.status))
        .catch((error) => {
          console.log(error);
        });
    };



    onRemoveItem = id => {

    this.setState(state => {
      const reports = state.reports.filter(report => report.review.id !== id);
      return {
        reports,
      };
    });
    const items = this.state.reports.filter(report => report.review.id === id);

    for (let report of items) {
      this.onDelete(report.id);
    }

    axios.delete(`${Api.REVIEWS}/${id}`)
        .then(response => console.log(response.status))
          .catch((error) => {
            console.log(error);
          });
  };

  onApproveItem = id => {

    this.setState(state => {
      const reports = state.reports.filter(report => report.review.id !== id);
      return {
        reports,
      };
    });

    const items = this.state.reports.filter(report => report.review.id === id);

    for (let report of items) {
      this.onDelete(report.id);
    }
  };

    componentDidMount() {
       axios.get(`${Api.REPORT}`)
       .then(response => response.data)
       .then(data => this.setState({ isloaded: true, reports : data.data.content}))
      .catch((error) => {
        console.log(error);
      });
      console.log("==========================="+this.state.reports);
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    var {  isloaded, reports } = this.state;

    if (!isloaded) {
        return (
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        )
    }
    else {
        return (
          <div className="animated fadeIn">
                <Card className="border-0 shadow-box col-10 mt-5 offset-1">
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Reported Comment</th>
                          <th scope="col">Reason</th>
                          <th scope="col"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map(report =>
                            <tr key={report.id}>
                              <td>{report.review.id}</td>
                                <td>{report.review.content}<div className="text-muted">on {report.review.clazz.teacher.name} - {report.review.clazz.subject.name}</div></td>
                                <td>{report.content}</td>
                                <td><Button className="mr-2 hust-red-bg rounded-border text-white float-right" onClick={() => this.onRemoveItem(report.review.id)}>Delete Review</Button>
                                <Button className="hust-bg mr-2 rounded-border text-white float-right"  onClick={() => this.onApproveItem(report.review.id)}>Approve</Button></td>
                            </tr>
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
export default AddTeacher;
