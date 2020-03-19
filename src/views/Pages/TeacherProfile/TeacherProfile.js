import React, { Component } from 'react';
import '../../../css/teacherprofile.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Col, Button, Row, CardHeader, ListGroup, ListGroupItem,
} from 'reactstrap';
import axios from 'axios';
import Api from "../../../utils/Api";
import { Link } from "react-router-dom";

class TeacherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          teacher:{
            id:"",
            name:"",
            age:"",
            address:"",
            phoneNumber:"",
            school:"",
            email:"",
            achievement:"",
            imageUrl:""
          },
          isloaded:false
        };
      }
    
      componentDidMount() {
        axios.get(`${Api.TEACHERS}/${this.props.match.params.id}`)
        .then(response => response.data.data)
        .then(data => this.setState({
            isloaded:true,
            teacher:{
                id:data.id,
          name:data.name,
          age:data.age,
          address:data.address,
          phoneNumber:data.phoneNumber,
          school:data.school,
          email:data.email,
          achievement:data.achievement,
          imageUrl:data.imageUrl
            }
        }))
       .catch((error) => {
         console.log(error);
       });
     }
    
    render() {
        const {isloaded,teacher} = this.state;
        const id = teacher.id;
        const userLink = `/teachers/${id}/list`;

        if(!isloaded){
            return (
                <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            )
        }
        else{
        return (
            <div className="animated fadeIn">
                <div className="font-header">Teacher Profile</div>
                <br />
                <br />
                <Row>
                    <Card className="col-3 row-10 card-view">
                        <CardImg top width="100%" src="https://soict.hust.edu.vn/wp-content/uploads/thongtinchung/ktmt/hungpn-200x200.jpg?fbclid=IwAR1XfDY8ymdHIjjPXOegW4l6TIgoA7al9IDvP0gyr6PbohgpI8BckCLOTas" alt="Card image cap" />
                        <CardBody>
                            <CardTitle className="card-name">{teacher.name}</CardTitle>
                            <Row>
                                <CardText className="col-4 card-text">Age</CardText>
                                <CardText>{teacher.age}</CardText>
                            </Row>

                            <Row>
                                <CardText className="col-4 card-text">School</CardText>
                                <CardText>{teacher.school}</CardText>
                            </Row>

                            <Row>
                                <CardText className="col-4 card-text">Email</CardText>
                                <CardText>{teacher.email}</CardText>
                            </Row>

                            <Row>
                                <CardText className="col-4 card-text">Phone</CardText>
                                <CardText>{teacher.phoneNumber}</CardText>
                            </Row>

                            <Button className="button-see-reviews card-text"><Link to={userLink}
                            >See Reviews</Link></Button>
                        </CardBody>
                    </Card>
                    <Col>
                        <Card className="card-info">
                            <CardHeader className="card-info-header">Working Address</CardHeader>
                            <CardBody>
                                <Col>
                                    <CardText className="card-text">Room 601-B1</CardText>
                                    <CardText className="card-text">Hanoi University of Science and Technology</CardText>
                                    <CardText className="card-text">Number 1, Dai Co Viet street, Hanoi</CardText>
                                </Col>
                            </CardBody>
                        </Card>
                        <Card className="card-info">
                            <CardHeader className="card-info-header">Subjects Teaching</CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem className="card-text">Computer Architecture</ListGroupItem>
                                    <ListGroupItem className="card-text">Logic Circuit</ListGroupItem>
                                    <ListGroupItem className="card-text">Embedded System Programming</ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                        <Card className="card-info">
                            <CardHeader className="card-info-header">Research Approach</CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem className="card-text">Automatic Housekeeping Robot</ListGroupItem>
                                    <ListGroupItem className="card-text">Replying Girlfriends Chatbot</ListGroupItem>
                                    <ListGroupItem className="card-text">Modern CPU Chips</ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                        <Card className="card-info">
                            <CardHeader className="card-info-header">Scientific Achievements</CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem className="card-text">Papers: Chang la do cho, cho la Chang, done with Tran Ngoc Thanh Trang from Topica corporation</ListGroupItem>
                                    <ListGroupItem className="card-text">Papers: Yen an com, Yen khong an cut, com roi cung thanh cut, rac roi tai sao Yen khong an cut ngay tu dau, done with Nguyen Hai Yen from Cowell</ListGroupItem>
                                    <ListGroupItem className="card-text">Papers: Thinh hamlon, thinh hamlon, thinh hamlon, dieu quan trong phai nhac lai 3 lan, done with Ha Le Thinh from ForgetCompanyName</ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </div>
        )
        }
    }
}

export default TeacherProfile;
