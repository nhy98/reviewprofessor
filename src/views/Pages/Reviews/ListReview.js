import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Card, CardDeck, CardBody, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import '../../../css/stylesheet.css';
import constants from "../../../utils/Constants";
import Api from "../../../utils/Api";
import { Link } from 'react-router-dom';

const token = localStorage.getItem(constants.TOKEN);
const authToken = `Bearer ${token}`;
const axios = require('axios');


class ListReview extends Component {
  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
    this.send = this.send.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.state = {
        isloaded: false,
        reviews: [],
        modal: false,
        current_user: 0,
        content: "",
        listReviewByTeacher:[],
        id:0
    };


    this.toggle = this.toggle.bind(this);
    this.set_current_user = this.set_current_user.bind(this);
    this.wrapperFunction = this.wrapperFunction.bind(this);
  }

  handleReasonChange(e){
     this.setState({content: e.target.value});
  }

  check(){
      if (this.state.content.length < 1){
          alert("Reason cannot be null!")
          return false;
      }
      return true;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
}

    set_current_user(id) {
        this.setState({
          current_user: id,
          isnull: 1,
        });
    }


    wrapperFunction = id => e => {
    this.toggle();
    this.set_current_user(id);
}

    send (){
        // console.log(this.state.content);
        if (this.check()){
            let data = {
                "content": this.state.content,
                "review": {
                    "id": this.state.reviews[this.state.current_user].id
                },
                "user": {
                    "userId": localStorage.getItem("userId"),
                    "role": localStorage.getItem("role")
                }
            };
            console.log(data);
            axios.post(`${Api.REPORT}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                alert("Thanks for reporting to us!");
                this.toggle();
              }).catch(err => {
                console.log(err.response.data);
                console.log(err.response.status);
              });
        }
    }
  componentDidMount() {
    const id1 = this.props.match.params.id;
    var id = parseInt(id1)
     axios.get(`${Api.REVIEWS}`,{ headers: {
         'Authorization': authToken,
         'Content-Type': 'application/json'
     }})
     .then(response => response.data)
     .then(data => this.setState({ isloaded: true, reviews: data.data.content, isnull: data.data.totalElements,id:id}))
    .catch((error) => {
      console.log(error);
    });



  }
  componentDidUpdate(){
      console.log(this.state);
      console.log("did updateeeeeeeeeee")

  }
  render() {
    var {  isloaded, reviews, isnull,listReviewByTeacher,id } = this.state;
    if (!isloaded) {
        return (
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        )
    }
    else {
        const items = this.state.reviews.filter(areview => areview.clazz.teacher.id === id);
        console.log(this.state.id);

        console.log(items.length)
        if (items.length === 0) {
            return (
                <h2 className="mt-4 text-center">This page currently has no review!</h2>
            )
        }
        else {
            var rv = items[this.state.current_user];
            console.log(rv.id);
        return (
            <div id="parent">
            <Modal isOpen={this.state.modal} toggle={this.toggle} aria-labelledby="contained-modal-title-vcenter"
        centered>
              <ModalBody className="mx-4">
              <Form>
                    <p><strong>You are reporting this comment with content:</strong></p>
                    <p className="text-muted">{rv.content}</p>
                    <p className="text-muted">ID: {rv.id}</p>
                    <p><strong>Please provide the reason here:</strong></p>
                    <InputGroup className="mb-3 h-50">
                      <Input type="text" placeholder="Reason" onChange={this.handleReasonChange} autoComplete="Reason" />
                    </InputGroup>
                    <Button className="mr-2 hust-bg rounded-border text-white float-right" onClick={this.toggle}>Cancel</Button>
                    <Button className="mr-2 hust-red-bg rounded-border text-white float-right" onClick={this.send}>Report</Button>
                  </Form>
              </ModalBody>
            </Modal>
            <h2 className="mt-4 text-center">Recent reviews</h2>
            <ul class="list-unstyled" id="child">
              {items.map((review,index) =>
                  <li key={index}>
                        <CardDeck className="row justify-content-center">
                        <Card className="text-white shadow-box col-3 mt-4 mb-0 speech-bubble rounded-border">
                          <CardBody className=" p-4">
                          <h3 className="p-0">Avg. {(review.teacherRate+review.subjectRate)/2}/10 <i class="fa fa-star fa-1x"></i></h3>
                          <p className="m-0">{review.content}</p>
                          <p className="m-0"><i class="fa fa-tags fa-1x"></i> Tags: #{review.tag}</p>
                          </CardBody>
                        </Card>
                          <Card className="border-0 col-5 mt-4 mb-0 login-bg shadow-box rounded-border">
                            <CardBody className="p-4">
                              <h3 class="text-white">{review.clazz.teacher.name} <a className="float-right text-white" onClick={this.wrapperFunction(index)}>
                              <i class="fa fa-flag opaque-bg text-white fa-1x turn-blue"></i>
                              {review.user.userId === localStorage.getItem("userId") ? <i class="ml-2 opaque-bg turn-blue fa fa-edit fa-1x"></i>:""}
                              </a></h3>
                              <p className="m-0 text-white opaque-bg">On class: {review.clazz.subject.name}</p>
                              <p className="m-0 text-white">Teacher Score: {review.teacherRate}/10</p>
                              <p className="m-0 text-white">Class Score: {review.subjectRate}/10</p>

                              <Button className="hust-bg rounded-border shadow-box float-right"><Link className=" text-white" to={`/review/${review.id}`}>Detail</Link></Button>
                            </CardBody>
                          </Card>
                        </CardDeck>
                         <p className="col-4 offset-3 px-0 pt-4 mb-0 text-white text-bold "><strong><Link  className="text-white text-bold" to={`/users/${review.user.userId}`}>{review.user.username}</Link></strong> reviewed on {review.createdDate}</p>
                  </li>
              )}
            </ul>
            </div>
        );
    }
  }
}
}
export default ListReview;
