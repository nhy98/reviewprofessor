import React, { Component } from 'react';
import { ButtonDropdow } from 'reactstrap';
import Rating from 'react-rating';
import '../../css/teacher.css'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Modal,
  ModalBody
} from 'reactstrap';
import stateUtils from "../../utils/StateUtils";
import reviewService from "../../services/ReviewServices";
import { connect } from "react-redux";
import Api from '../../utils/Api.js'
import axios from 'axios';
class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
        teacher: {
          name: "",
          school: ""
        },
        review:{
            content:"",
            attendance:0,
            credit:0,
            createdDate:"",
            subjectRate:0,
            teacherRate:0,
            tag: "ahihihihi tao la yến nhé",
            clazz:{
                id:"",
                teacher:{
                  name:"",
                  school:"",
              }
            },
            user:{
                userId:3,
                role:2
            }
        },
        teachers:[],
        available: true,
        available1:false,
        dropdownOpen: new Array(19).fill(false),
        isloaded: false,
        modal:false,
        modal1:false
      };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle1 = this.toggle.bind(this)
  }
  toggle2() {
    this.setState({
      modal: !this.state.modal,
    });
  }
    toggle1() {
      this.setState({
        modal1: !this.state.modal1,
      });
}
wrapperFunction(){
  this.toggle2();
}
wrapperFunction1(){
  this.toggle1();
}
  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }


  handleSearchUser() {
    const teacher = this.state.teacher;
    const items = this.state.teachers.filter(ateacher => ateacher.name === teacher.name && ateacher.school===teacher.school);
    console.log(items);
    if(items.length>0){
      console.log("có vào đay nhéee");
      this.setState({
        available:true,
        available1:true,
        review:{
          ...this.state.review,
          clazz:{
            ...this.state.review.clazz,
            teacher:{
              name:teacher.name,
              school:teacher.school
            }
          }
        },
        modal1:true
      });
    }
    else{
      this.setState({
        teacher:{
          name:"",
          school:""
        },
        available:false,
        available1:false
      });
    }
  }


  onChangeAttendance(attend){
    console.log(this.state.review.attendance+"============================");
      console.log(attend);
      if(attend==="required"){
          console.log("vào truee khônggg")
        this.setState({
            review:{
              ...this.state.review,
               attendance :1
            }
         });
         console.log(this.state.review.attendance+"============================");

      }
      else{
        console.log(this.state.review.attendance+"============================");
          console.log("vao false khong????")
        this.setState({
            review:{
               attendance :0
            }
         });
      }
      console.log(this.state.review.attendance+"============================");

  }
  onChangeCredit(cre) {
    if(cre==="required"){
        this.setState({
            review:{
              ...this.state.review,
               credit :1
            }
         });
      }
      else{
        this.setState({
            review:{
              ...this.state.review,
               credit :0
            }
         });
      }
      console.log(this.state.review.credit);
  }
  handleSubmitReview(){
    if(this.state.available1==true){
      stateUtils.clearMsgUser();
    console.log("ahihihihi click submit r ha");
    console.log(this.state.review.credit+"ahihihihihihi");
    const { dispatch } = this.props;
    const {review,teacher} = this.state;
    console.log(review.content+"-----"+"truyen r ma nhi");

    console.log(review.user.userId+"-----"+"truyen r ma nhi");
    console.log(review.user.role+"-----"+"role");


    if(this.state.available===true&& this.state.review.clazz.id!=null){
      reviewService.submitReview(review,teacher,dispatch);
      this.wrapperFunction();
    }
    else{
      //do nothing
    }
    }
    else{
      this.setState({
        available:false
      })
    }
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    console.log(this.state+"did mounttt");
    axios.get(`${Api.TEACHERS}/list`)
       .then(response => response.data)
       .then(data => this.setState({
         teachers : data.data,
         review:{
          user:{
            userId:userId,
            role:role
          }
         },
         isloaded:true
        }))
      .catch((error) => {
        console.log(error);
      });
      console.log(this.state.teachers);
      console.log(this.props.match.params.type);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
    console.log(this.state);

    console.log(reviewService.flag);
    console.log(this.props.teacher.name);
  }
  render() {
      const available = this.state.available;
      const {isloaded} = this.state;
      if (!isloaded) {
        return (
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        )
    }
    else {
    return (
      <div className="animated fadeIn " id="parent">
      <div id="child">
      <Modal isOpen={this.state.modal} toggle={this.toggle2} aria-labelledby="contained-modal-title-vcenter"
        centered>
              <ModalBody className="mx-4">
              <Form>
                    <p><strong>Submit Review Successful </strong></p>

                    <Button className="mr-2 hust-bg rounded-border text-white float-right" onClick={this.toggle2}>OK</Button>
                  </Form>
              </ModalBody>
            </Modal>

        <Card className="col-8 shadow-box mt-5 offset-2">
            <h3 className="text-center m-4">Search for a Teacher</h3>

            <div className="row justify-content-center mb-3">
                  <InputGroup className="col-4">
                    <Input type="email" id="input2-group3" name="input2-group3"
                        value={this.state.teacher.school}
                        placeholder="School"
                            onChange={e => {
                              this.setState({
                                teacher: {
                                  ...this.state.teacher,
                                  school: e.target.value
                                },
                              });
                            }}
                    />
                  </InputGroup>

              <InputGroup className="col-4">
                <Input type="text" id="username2" name="username2" autoComplete="name"
                        placeholder="Name"
                        value={this.state.teacher.name}
                        onChange={e => {
                          this.setState({
                            teacher: {
                              ...this.state.teacher,
                              name: e.target.value
                            }
                          });
                        }}

                 />
              </InputGroup>
            </div>
            <Button className="col-2 offset-5 shadow-box text-white register-bg mb-4"
            onClick={this.handleSearchUser.bind(this)}
            >
                  Check
          </Button>
                        <div
                          className="text-center"
                          hidden={available == true ? true : false}
                        >
                              <p style={{ color: "black" }}>This professor is not existed </p>

                        </div>
                        <div
                          className="text-center"
                          hidden={this.state.available1 == false ? true : false}
                        >
                              <p style={{ color: "blue" }}>Good</p>
                        </div>

        <hr></hr>

        <Col>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal mt-3">

            <FormGroup row>
              <Col md="2">
                <div className="">Course ID</div>
              </Col>
              <Col xs="8" md="9">
                <div className="controls">
                  <InputGroup>
                    <Input type="text" id="input2-group3" name="input2-group3" placeholder="Enter course ID" required
                            onChange={e => {
                              this.setState({
                                review: {
                                    ...this.state.review,
                                    clazz:{
                                        ...this.state.review.clazz,
                                        id: e.target.value
                                    }
                                }
                              });
                            }}
                    />

                  </InputGroup>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="4">
                <div className="">Attendance Requirement</div>
              </Col>
              <Col md="8">
                <FormGroup check inline>
                  <Button className="hust-bg shadow-box text-white" id="1" onClick={e =>
                            this.onChangeAttendance("required")
                          }>
                    Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="hust-bg shadow-box text-white" id="1" onClick={e =>
                            this.onChangeAttendance("not-required")
                          }>
                    No
                        </Button>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="4">
                <div className="">Credit</div>
              </Col>
              <Col md="8">
                <FormGroup check inline>
                  <Button className="hust-bg shadow-box text-white"  id="2" onClick={e =>
                           this.onChangeCredit("required")
                         }>
                    Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="hust-bg shadow-box text-white" id="2" onClick={e =>
                        this.onChangeCredit("not-required")
                      }>
                    No
                        </Button>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="">Date Created</div>
              </Col>
              <Col xs="8" md="9">
                <Input type="date" id="date-input" name="date-input" placeholder="date"
                        value={this.state.review.createdDate}
                            onChange={e => {
                              this.setState({
                                review: {
                                  ...this.state.review,
                                  createdDate: e.target.value
                                }
                              });
                            }}
                 />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="">To be more specific</div>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                  placeholder="Review..."
                  value={this.state.review.content}
                            onChange={e => {
                              this.setState({
                                review: {
                                  ...this.state.review,
                                  content: e.target.value
                                }
                              });
                            }}
                  />
              </Col>
            </FormGroup>

            // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <FormGroup row>
              <Col md="2">
                <div className="">Rating Subject</div>
              </Col>
              <Col xs="12" md="9">

                <div id="rate-subject">
                    <Rating id="rate-1" className="" name="rate-1" initialRating={this.state.review.subjectRate}
                    emptySymbol="fa fa-star-o fa-2x medium"
                    fullSymbol="fa fa-star fa-2x medium"
                    fractions={2}
                    onChange={(rate) => this.setState({
                                review: {
                                  ...this.state.review,
                                  subjectRate: rate
                                }
                              })}

                     />
                </div>

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <div className="">Rating Professor</div>
              </Col>
              <Col xs="12" md="9">
                <div id="rating-teacher">
                    <Rating id="rate-2" name ="rate-2" initialRating={this.state.review.teacherRate}
                    emptySymbol="fa fa-star-o fa-2x medium"
                    fullSymbol="fa fa-star fa-2x medium"
                    fractions={2}
                    onChange={(rateteacher) => this.setState({
                                review: {
                                  ...this.state.review,
                                  teacherRate: rateteacher
                                }
                              })}
                    />
                </div>
              </Col>
            </FormGroup>
          </Form>
          <br />
          <br />


          <Row >
            <Col className="button-last">

              <Button  className="shadow-box text-white hust-bg mb-4"
              onClick={this.handleSubmitReview.bind(this)}
              > Submit</Button>
            </Col>
            <Col>

              <Button type="reset"  className="shadow-box text-white register-bg mb-4">Reset</Button>
            </Col>

          </Row>

        </Col>
        <br />
        <br />
        </Card>
      </div>
      </div>
    );
                            }
  }
}

export default connect(state => ({
    review: state.ReviewReducer.review,
    teacher:state.ReviewReducer.review.teacher
  }))(Review);
