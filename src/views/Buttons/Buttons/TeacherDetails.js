import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  InputGroup,
  FormGroup,
  Input,
  InputGroupAddon,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import PaginationBox from "../pagination/PaginationBox";
import i18n from "../components/I18n";
import { Link } from "react-router-dom";
import '../../css/info.css';
import axios from 'axios';
import Api from "../../../utils/Api";


class TeacherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      name:"",
      age:"",
      address:"",
      phoneNumber:"",
      school:"",
      email:"",
      achievement:"",
      imageUrl:"",
      isloaded:false
    };
  }

  componentDidMount() {
    axios.get(`${Api.TEACHERS}/${this.props.match.params.id}`)
    .then(response => response.data)
    .then(data => this.setState({
        isloaded:true,
        id:data.id,
      name:data.name,
      age:data.age,
      address:data.address,
      phoneNumber:data.phoneNumber,
      school:data.school,
      email:data.email,
      achievement:data.achievement,
      imageUrl:data.imageUrl
    }))
   .catch((error) => {
     console.log(error);
   });
 }

  

  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                  <Col md={2} className="font-title2">
                    <i className="fa fa-align-justify" />{" "}
                    Courses
                  </Col>
                  
              </CardHeader>
              <CardBody>
                
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">
                        Course ID
                      </th>
                      <th scope="col">
                        Semester
                      </th>
                      <th scope="col">
                        Room
                      </th>
                      <th scope="col">
                        Subject
                      </th>
                      <th scope="col">
                        Teacher
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeacherDetails;
