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
  Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import '../../../css/info.css';
import PaginationBox from "../../pagination/PaginationBox";
import userService from "../../../services/TeacherServices";
import i18n from "../../components/I18n";
import { Link } from "react-router-dom";
import stateUtils from "../../../utils/StateUtils";
import { connect } from "react-redux";
import Api from '../../../utils/Api.js'
import axios from 'axios';

function UserRow(props) {
  const user = props.user;
  const { userKey } = props;
  console.log(user+"userrrrrr");
  const userLink = `/teachers/${user.id}`;

  return (
    <Col key={userKey} >
                <div className="text-center">
                      <img src={user.imageUrl} className="img-avatar" height="36px" alt="admin@bootstrapmaster.com" />
                      <span className="avatar-status badge-success"></span>
                      <hr/>
                      <h5 className="text-center"><Link to={userLink}>{user.name}</Link></h5>
                      <div className="text-muted">
                        <span>{user.school}</span>
                      </div>
                </div>
                <br></br>
    </Col>
  );
}
class Info extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      userLocals: {
        paging: {
          start: 1,
          end: 4,
          active: 1
        }
      },
      search: {
        searchText: ""
      },
      collapse: true,
      fadeIn: true,
      timeout: 300,
      teacher:{
        name:"",
        school:"",
      },
      teachers:[],
      isloaded:false,
      available:true,
      redirect:false
    };
  }

  handleSearchUser=() => {
    const teacher = this.state.teacher;
    const items = this.state.teachers.filter(ateacher => ateacher.name === teacher.name && ateacher.school===teacher.school);
    console.log(items);
    if(items.length>0){
      console.log("có vào đay nhéee");
      this.setState({
        available:false,
        redirect:true
      });
    }
    else{
      this.setState({
        teacher:{
          name:"",
          school:""
        },
        available:false,
        redirect:false
      });
    }
    stateUtils.clearMsgUser();
    if(teacher.name!=""){
      console.log("co khong mayyyy");
      const id = items[0].id;
      console.log(id+"idddddddddd");
      this.props.history.push(`/teachers/${id}`);

    }
    }
    resetData(){
      this.setState({
        teacher:{
          name:"",
          school:""
        }
      });
    }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleNextUserPage() {
    const { users } = this.props;

    const { userLocals } = this.state;
    const { start, end, active } = userLocals.paging;
    const total = users.totalPage;
    console.log(
      "Next Page User:   start: ",
      start,
      " : end: ",
      end,
      "  : active: ",
      active,
      "    : total Page: ",
      total
    );

    // if (end < total) {
    //   console.log("set start end up 1");

    //   this.setState({
    //     userLocals: {
    //       // ...this.state.userLocals,
    //       paging: {
    //         ...this.state.userLocals.paging,
    //         start: start + 1,
    //         end: end + 1
    //       }
    //     }
    //   });
    // }
    if (active < end) {
      if (end < total) {
        this.setState(
          {
            userLocals: {
              // ...this.state.userLocals,
              paging: {
                ...this.state.userLocals.paging,
                active: active + 1,
                start: start + 1,
                end: end + 1
              }
            }
          },
          this.handlePageUserClick(active + 1)
        );
      } else if (end > total) {
        this.setState(
          {
            userLocals: {
              // ...this.state.userLocals,
              paging: {
                ...this.state.userLocals.paging,
                active: active + 1,
                end: total
              }
            }
          },
          this.handlePageUserClick(active + 1)
        );
      } else {
        this.setState(
          {
            userLocals: {
              // ...this.state.userLocals,
              paging: {
                ...this.state.userLocals.paging,
                active: active + 1
              }
            }
          },
          active + 1 <= end ? this.handlePageUserClick(active + 1) : null
        );
      }
    }
  }
  handlePrevUserPage() {
    const { userLocals } = this.state;
    const { start, end, active } = userLocals.paging;
    if (active >= start) {
      if (start > 1) {
        this.setState(
          {
            userLocals: {
              ...this.state.userLocals,
              paging: {
                ...this.state.userLocals.paging,
                start: start - 1,
                end: end - 1,
                active: active - 1
              }
            }
          },
          this.handlePageUserClick(active - 1)
        );
      } else if (start === 1) {
        this.setState(
          {
            userLocals: {
              ...this.state.userLocals,
              paging: {
                ...this.state.userLocals.paging,
                active: active > 1 ? active - 1 : active
              }
            }
          },
          active - 1 > 0 ? this.handlePageUserClick(active - 1) : null
        );
      }
    }
  }
  handlePageUserClick(page) {
    this.setState({
      userLocals: {
        ...this.state.userLocals,
        paging: {
          ...this.state.userLocals.paging,
          active: page
        }
      }
    });
    console.log(this.state.userLocals.paging.active);
    const key = this.state.search.searchText;
    this.defaultGetUser(2, page);
  }

  defaultGetUser(key, page) {
    const { dispatch } = this.props;
    const limit = 10;
    const offset = (page - 1);
    userService.getTeachers(key, offset,dispatch);

    //userService.getUsers(key, offset, limit, xKey, dispatch);
  }

  componentDidMount() {
    const size = 10;
    const page = 1;
    stateUtils.clearMsgUser();
    this.defaultGetUser(size, page);
    axios.get(`${Api.TEACHERS}/list`)
       .then(response => response.data)
       .then(data => this.setState({
         teachers : data.data,
         isloaded:true
        }))
      .catch((error) => {
        console.log(error);
      });
      console.log(this.state.teachers);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
    console.log(this.state);


  }

  render() {
    const { userLocals,available } = this.state;
    const { users } = this.props;
    const userList = users.dataTeacher;
    console.log("Length:" +userList.length);
    const {isloaded} = this.state;
    if(!isloaded){
      return (
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    )
    }
    else{

    return (
      <div className="animated fadeIn" id="parent">
      <div id="child">
      <Card className="col-8 shadow-box mt-5 offset-2" >
      <div>

            <h3 className="text-center mt-4">Find a Professor</h3>

      <Row>
          <Col xs="4" >
          </Col>
          <Col xs="4">
            <div className="padding-search">
            <Form className="form-horizontal ">
                     <FormGroup>

                        <div className="controls">
                        <InputGroup>
                        <Input type="text" id="input2-group3" name="input2-group3"
                        placeholder="Professor's school"
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
                      </FormGroup>
                      <FormGroup>
                        <div className="controls">
                          <InputGroup>
                            <Input type="text" id="username2" name="username2" placeholder="Professor's name" autoComplete="name"

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
                      </FormGroup>
                      <div className="row">
                        <Button className="col-5 mr-2 shadow-box text-white hust-bg mb-4" onClick={this.handleSearchUser.bind(this)}>Search</Button>
                        <Button className="col-5 shadow-box text-white register-bg mb-4" color="secondary" onClick={this.resetData.bind(this)}>Reset</Button>
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
                      </div>

                    </Form>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
          <Col xs="12" className="width-max">
          <hr></hr>
            <h3 className="text-center"> List Professors</h3>

                        <Row>
              <ul>
                <li>Phó Giáo Sư : 1</li>
                <li>Tiến Sĩ : 10</li>
                <li>Thạc Sĩ : 10</li>
                <li>Kỹ Sư : 1</li>
              </ul>
              </Row>
            <Row>
              {userList.length > 0
                      ? userList.map((user, index) => (
                          <UserRow
                            key={index}
                            userKey={index}
                            user={user}
                          />

                        ))
                      : null}
              </Row>
              <br/>

              <br/>
            <div className="row justify-content-center">
              <PaginationBox
                  start={userLocals.paging.start}
                  end={userLocals.paging.end}
                  total={users.totalPage}
                  active={userLocals.paging.active}
                  handleNext={this.handleNextUserPage.bind(this)}
                  handlePrev={this.handlePrevUserPage.bind(this)}
                  handlePageClick={this.handlePageUserClick.bind(this)}
                /></div>
          </Col>
        </Row>
        </Card>
      </div>
      </div>
    );
                      }
  }
}

export default connect(state => ({
  users: state.TeacherReducer.users,
  teacher: state.TeacherReducer.teacher
}))(Info);
