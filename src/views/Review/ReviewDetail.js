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
class ReviewDetail extends Component {

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
        dropdownOpen: new Array(19).fill(false),
        isloaded: false,
        modal:false
      };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

  }
  toggle2() {
    this.setState({
      modal: !this.state.modal,
    });
}
wrapperFunction(){
  this.toggle2();
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
        review:{
          ...this.state.review,
          clazz:{
            ...this.state.review.clazz,
            teacher:{
              name:teacher.name,
              school:teacher.school
            }
          }
        }
      });
    }
    else{
      this.setState({
        teacher:{
          name:"",
          school:""
        },
        available:false
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
    stateUtils.clearMsgUser();
    console.log("ahihihihi click submit r ha");
    console.log(this.state.review.credit+"ahihihihihihi");
    const { dispatch } = this.props;
    const {review,teacher} = this.state;
    console.log(review.content+"-----"+"truyen r ma nhi");
    console.log(review.clazz.teacher.name+"-----"+"truyen r ma nhi");
    console.log(review.user.userId+"-----"+"truyen r ma nhi");
    console.log(review.user.role+"-----"+"role");


    if(this.state.available===true){
      reviewService.submitReview(review,teacher,dispatch);
      this.wrapperFunction();
    }
    else{
      //do nothing
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
         }
        }))
      .catch((error) => {
        console.log(error);
      });
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
       console.log("dm k vao dây à");
      console.log(this.state.teachers);
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
      <div className="animated fadeIn">
      <Modal isOpen={this.state.modal} toggle={this.toggle2} aria-labelledby="contained-modal-title-vcenter"
        centered>
              <ModalBody className="mx-4">
              <Form>
                    <p><strong>Submit Review Successful </strong></p>

                    <Button className="mr-2 hust-bg rounded-border text-white float-right" onClick={this.toggle2}>OK</Button>
                  </Form>
              </ModalBody>
            </Modal>
        <div className="font-header border-bottom">Rate Your Professor</div>
        <br />

        <Card className="col-7 card-whole mb-3">
          <CardHeader className="card-header mb-3">
            <div className="font-card">
              Search For One Professor
            </div>
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Col md="3">
                <div className="font-card-body">School</div>
              </Col>
              <Col xs="12" md="8">
                <div className="controls">
                  <InputGroup>
                    <Input type="email" id="input2-group3" name="input2-group3"
                        value={this.state.teacher.school}
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
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <div className="font-card-body">Name</div>
              </Col>
              <Col xs="12" md="8">
                <div className="controls">
                  <InputGroup>
                    <Input type="text" id="username2" name="username2" autoComplete="name" placeholder="ahihihi"
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
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            </FormGroup>
            <Button color="danger" className="btn-pill" size="lg"
            onClick={this.handleSearchUser.bind(this)}
            >
                  <i className="fa fa-lightbulb-o"></i>&nbsp;CHECK
          </Button>
                        <InputGroup
                          className="mb-4"
                          hidden={available == true ? true : false}
                        >
                          <Col md="9">
                            <FormGroup row check className="checkbox">
                              <p style={{ color: "red" }}>This professor is not existed </p>
                            </FormGroup>
                          </Col>
                        </InputGroup>
          </CardBody>
        </Card>

        <br />
        <hr className="divider"></hr>
        <br />

        <Col>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

            <FormGroup row>
              <Col md="2">
                <div className="font-title">Course ID</div>
              </Col>
              <Col xs="12" md="9">
                <div className="controls">
                  <InputGroup>
                    <Input type="email" id="input2-group3" name="input2-group3" placeholder="Enter course ID"
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
              <Col md="2">
                <div className="font-title">Attendance Requirement</div>
              </Col>
              <Col md="9">
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios"
                    value="required"
                    onClick={e =>
                              this.onChangeAttendance("required")
                            }
                     />Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios"
                    value="not-required"
                    onClick={e =>
                              this.onChangeAttendance("not-required")
                            }
                    />No
                        </Button>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="font-title">Credit</div>
              </Col>
              <Col md="9">
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios2"
                     value="required"
                     onClick={e =>
                              this.onChangeCredit("required")
                            }
                      />Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios2"
                        value="not-required"
                        onClick={e =>
                              this.onChangeCredit("not-required")
                            }
                         />No
                        </Button>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="font-title">Date Created</div>
              </Col>
              <Col xs="12" md="9">
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
                <div className="font-title">To be more specific</div>
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

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <FormGroup row>
              <Col md="2">
                <div className="font-title">Rating Subject</div>
              </Col>
              <Col xs="12" md="9">

                <div id="rate-subject">
                    <Rating id="rate-1" name="rate-1" initialRating={this.state.review.subjectRate}
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
                <div className="font-title">Rating Professor</div>
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

              <Button size="md" color="primary" className="hust-bg-last"><i className="fa fa-dot-circle-o"
              onClick={this.handleSubmitReview.bind(this)}
              ></i> Submit</Button>
            </Col>
            <Col>
              <Button type="reset" size="md" color="primary" className="hust-bg-last"><i className="fa fa-ban"></i> Reset</Button>
            </Col>

          </Row>

        </Col>
        <br />
        <br />

      </div>
    );
                            }
  }
}

export default connect(state => ({
    review: state.ReviewReducer.review,
    teacher:state.ReviewReducer.review.teacher
  }))(ReviewDetail);
