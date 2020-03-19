import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Modal, ModalBody, Input, InputGroup, Form } from 'reactstrap';
import '../../../css/stylesheet.css';
import constants from "../../../utils/Constants";
import Api from "../../../utils/Api";
import { Link } from 'react-router-dom';
const axios = require('axios');


class ReviewDetail extends Component {
    constructor(props) {
      super(props);

      this.check = this.check.bind(this);
      this.send = this.send.bind(this);
      this.handleReasonChange = this.handleReasonChange.bind(this);
      this.toggle = this.toggle.bind(this);
          this.state = {
              isloaded: false,
              modal: false,
              reason: "",
              date: "",
              teacher_name: "",
              subject_rate: "",
              teacher_rate: "",
              room: "",
              credit: "",
              semester: "",
              att: "",
              content: "",
              tag: "",
              username: "",
              userId: "",
              subject_name: "",
          };
        }


          handleReasonChange(e){
             this.setState({reason: e.target.value});
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

        send (){
            // console.log(this.state.content);
            if (this.check()){
                let data = {
                    "content": this.state.reason,
                    "review": {
                        "id": this.props.match.params.id
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
        axios.get(`${Api.REVIEWS}/${this.props.match.params.id}`)
        .then(response => response.data.data)
        .then(data => this.setState({
            isloaded: true,
            date: data.createdDate,
            teacher_name: data.clazz.teacher.name,
            subject_rate: data.subjectRate,
            teacher_rate: data.teacherRate,
            room: data.clazz.room,
            credit: data.credit,
            semester: data.clazz.semester,
            att: data.attendance,
            content: data.content,
            tag: data.tag,
            username: data.user.username,
            userId: data.user.userId,
            subject_name: data.clazz.subject.name,
        }))
       .catch((error) => {
         console.log(error);
       });

     }

  render() {
    var {  isloaded, date, teacher_name, subject_rate, teacher_rate, room, credit, semester, att, content, tag, username, userId, subject_name} = this.state;

    if (!isloaded) {
          return (
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          )
      }
    else {
    return (
      <div className="animated fadeIn">
      <Modal isOpen={this.state.modal} toggle={this.toggle} aria-labelledby="contained-modal-title-vcenter"
  centered>
        <ModalBody className="mx-4">
        <Form>
              <p><strong>You are reporting this comment with content:</strong></p>
              <p className="text-muted">{content}</p>
              <p className="text-muted">ID: {this.props.match.params.id}</p>
              <p><strong>Please provide the reason here:</strong></p>
              <InputGroup className="mb-3 h-50">
                <Input type="text" placeholder="Reason" onChange={this.handleReasonChange} autoComplete="Reason" />
              </InputGroup>
              <Button className="mr-2 hust-bg rounded-border text-white float-right" onClick={this.toggle}>Cancel</Button>
              <Button className="mr-2 hust-red-bg rounded-border text-white float-right" onClick={this.send}>Report</Button>
            </Form>
        </ModalBody>
      </Modal>
            <Card className="col-6 shadow-box mt-5 offset-3">
                <CardHeader className="m-0 pb-0">
                 <strong className="mx-3">ID: </strong>{this.props.match.params.id}

                 {userId === localStorage.getItem("userId") ? <i class="mt-2 ml-2 turn-blue fa fa-edit fa-1x float-right"></i>:""}
                 <i class="mt-2 fa fa-flag fa-1x turn-blue float-right" onClick={this.toggle}></i>
                 <p className="mx-3">By <Link to={`/users/${userId}`}>{username}</Link> on {date}</p>
                </CardHeader>
              <CardBody className="m-0 ">
              <div className="p-0 col-3 float-left"><strong>Teacher:</strong></div>
              <div>{teacher_name === null ? "No Information" : teacher_name}</div>
              <div className="p-0 col-3 float-left"><strong>Subject:</strong></div>
              <div>{subject_name === null ? "No Information" : subject_name}</div>
               <div className="p-0 col-3 float-left"><strong>Semester:</strong></div>
               <div>{semester === null ? "No Information" : semester}</div>
               <div className="p-0 col-3 float-left"><strong>Room:</strong></div>
               <div>{room === null ? "No Information" : room}</div>
               <div className="p-0 col-3 float-left"><strong>Credit:</strong></div>
               <div>{credit === 1 ? "Required" : "Not required"}</div>
               <div className="p-0 col-3 float-left"><strong>Attendance:</strong></div>
               <div>{att === 1 ? "Required" : "Not required"}</div>
               <div className="p-0 col-3 float-left"><strong>Teacher Rate:</strong></div>
               <div>{teacher_rate}/10</div>
               <div className="p-0 col-3 float-left"><strong>Subject Rate:</strong></div>
               <div>{subject_rate}/10</div>
               </CardBody>
               <CardFooter>
               <div className="p-0 col-3 float-left"><strong>Comment:</strong></div>
               <div>{content === null ? "No Information" : content}</div>
               <div className="p-0 col-3 float-left"><strong>Tags:</strong></div>
               <div>{tag === null ? "No Information" : tag}</div>
               <div className="p-0 col-3 float-left"><strong>Average:</strong></div>
               <div>{(subject_rate+teacher_rate)/2}/10</div>
               <Button className="hust-bg rounded-border float-right"><Link className=" text-white" to={`/review`}>Back</Link></Button>
              </CardFooter>
              </Card>
      </div>
    )
  }
}
}
export default ReviewDetail;
