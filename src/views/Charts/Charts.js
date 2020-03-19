import React, { Component } from 'react';
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
  Pagination, PaginationItem, PaginationLink,CardGroup,
  Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem,
  Modal,ModalBody
} from 'reactstrap';
import '../../css/subject.css'
import axios from 'axios';
import Api from '../../utils/Api.js';
import { Link } from 'react-router-dom';
import '../../css/stylesheet.css';

function UserRow(props) {
  const user = props.user;
  const { userKey } = props;

  const userLink = `/review/detail/${user.id}`;

  return (
    <FormGroup check className="checkbox">
                        <i className="fa fa-star-o fa-2x medium mr-2"></i>
                        <Label check className="form-check-label" htmlFor="checkbox1"><Link to={userLink}>{user.name}</Link></Label>
    </FormGroup>
  );
}
class Charts extends Component {
constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      modal: false,
      isloaded:false,
      classes:[],
      subject:{
        name:"",
        school:""
      },
      available:true,
      listTeacher:[]
    };
    this.toggle = this.toggle.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
}
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  wrapperFunction(){
    this.toggle();
}
componentDidMount() {
  axios.get(`${Api.CLASSES}/list`)
     .then(response => response.data)
     .then(data => this.setState({
       classes : data.data,
       isloaded:true
      }))
    .catch((error) => {
      console.log(error);
    });
}
handleSearchUser=() => {
  const subject = this.state.subject;
  const {listTeacher} = this.state;
  const items = this.state.classes.filter(ateacher => ateacher.subject.name === subject.name && ateacher.teacher.school===subject.school);
  console.log(items);
  if(items.length>0){
    console.log("có vào đay nhéee");
    for (let item of items) {
      const name = {
        name:item.teacher.name,
        school:item.teacher.school,
        id: item.teacher.id
      }
      listTeacher.push(name);
    }
    this.setState({
      available:true,
      listTeacher:listTeacher
    });
    this.wrapperFunction();
  }
  else{
    this.setState({
      subject:{
        name:"",
        school:""
      },
      available:false,
    });
  }

  }
  componentDidUpdate(){
    console.log("did updateeeeeeeeeeeeeeeeee");
    console.log(this.state);
  }

  render() {
    const { activeIndex,isloaded } = this.state;
    if(!isloaded){
      return (
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    )
    }
    else{

    return (

      <div className="animated fadeIn  ">
      <Card className=" col-8 shadow-box login-bg my-5 offset-2">
      <Modal isOpen={this.state.modal} toggle={this.toggle} aria-labelledby="contained-modal-title-vcenter"
        centered className="hust-bg">
              <ModalBody className="mx-4">
              <Form>
                    <div className="font-header1">
                        {this.state.subject.name}
                    </div>
                    <div className="font-sub">
                      <h4>Click to professor' name to review</h4>
                    </div>
                    <div>
                    {this.state.listTeacher.length > 0
                      ? this.state.listTeacher.map((user, index) => (
                          <UserRow
                            key={index}
                            userKey={index}
                            user={user}
                          />
                        ))
                      : null}
                    </div>
                    <Button className="mr-2 hust-bg rounded-border text-white float-right" onClick={this.toggle}>OK</Button>
                  </Form>
              </ModalBody>
            </Modal>
            <h2 class="text-center text-white mt-3"> Find a Subject</h2>





                    <div className="row justify-content-center opaque-bg text-white mt-1 mb-3">
                    <div className="col-4">
                      <Input type="text" name="select" id="select" placeholder="Enter school's name "
                      value={this.state.subject.school}
                            onChange={e => {
                              this.setState({
                                subject: {
                                  ...this.state.subject,
                                  school: e.target.value
                                },
                              });
                            }}
                      />

                    </div>
                    <div className="col-4">
                      <Input type="text" id="exampleInputEmail2" placeholder="Enter subject's name " required
                      value={this.state.subject.name}
                                    onChange={e => {
                                      this.setState({
                                        subject: {
                                          ...this.state.subject,
                                          name: e.target.value
                                        },
                                      });
                                    }}
                       />
                    </div>
                    </div>
                    <p className="text-center text-white opaque-bg">
                      Please fill in the form your school as well as the name of the subject you want to find
                    </p>

              <Button className="col-2 offset-5 shadow-box text-white register-bg mb-4" onClick={this.handleSearchUser.bind(this)}>
                  Search
              </Button>
              <p
                          className="mb-4 text-white mt-0 p-0 text-center"
                          hidden={this.state.available == true ? true : false}
                        >
                            This subject is not existed
                </p>
        </Card>
    </div>
    );
    }
  }
}

export default Charts;
