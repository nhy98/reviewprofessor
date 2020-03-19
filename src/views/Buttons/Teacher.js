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
import userService from "../../services/ClassService";
import i18n from "../components/I18n";
import { Link } from "react-router-dom";
import stateUtils from "../../utils/StateUtils";
import '../../css/info.css';

function UserRow(props) {
  const user = props.user;
  const { userKey } = props;
  const subject = user.subject;
  console.log("subject: "+subject.name);
  // const userLink = `/managers/users/${user.member_code}`;

  return (
    <tr key={userKey}>
      <th scope="row">{user.id}</th>
      <td>{user.semester}</td>
      <td>{user.room}</td>
      <td>{user.subject.name}</td>
      <td>{user.teacher.name}</td>

    </tr>
  );
}

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocals: {
        paging: {
          start: 1,
          end: 4,
          active: 1
        }
      },
      search: {
        searchText: "",
        searchSubject: ""
      },
      listClass:[],
      isloaded:false
    };
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
    userService.getUsers(key, offset,dispatch);

    //userService.getUsers(key, offset, limit, xKey, dispatch);
  }

  componentDidMount() {
    const size = 2;
    const page = 1;
    stateUtils.clearMsgUser();
    this.defaultGetUser(size, page);
    this.setState({
      isloaded:true
    })
  }

  gotoDefaultGetUser() {
    const key = 2;
    const page = 1;
    this.setState({ search: { ...this.state.search, searchText: "" } });
    this.defaultGetUser(key, page);
  }
  findCourse(name,subject) {
    const { dispatch } = this.props;
    const courseID = {
      "subject":{
        "id":subject
      },
      "teacher":{
        "id":name
      }
    }
    const page = 0;
    const size = 10;
    userService.getAClass(courseID, page,size,dispatch);

    //userService.getUsers(key, offset, limit, xKey, dispatch);
  }

  handleSearchUser() {
    const name = this.state.search.searchText;
    const subject = this.state.search.searchSubject;
    stateUtils.clearMsgUser();
    this.findCourse(name,subject);
  }

  render() {
    const { userLocals,listClass } = this.state;
    const { users } = this.props;
    const userList = users.dataClass;
    const {isloaded} = this.state;
    if(!isloaded){
      return (
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    )
    }
    else{
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
          <Card className=" col-8 shadow-box my-5 offset-2">
              <CardHeader className="m-0 pb-0 ">
                  <h3 className="text-center">Courses</h3>
                        <div className="row mb-4 justify-content-center">
                        <div className="col-3 m-0">
                          <Input
                            type="text"
                            name="search_user"
                            placeholder="Teacher ID"
                            value={this.state.search.searchText}
                            onChange={e => {
                              this.setState({
                                search: {
                                  ...this.state.search,
                                  searchText: e.target.value
                                }
                              });
                            }}
                          />
                          </div>
                            <div className="mx-2 col-3">

                            <Input
                            type="text"
                            name="search_subject"
                            placeholder="Subject ID"
                            value={this.state.search.searchSubject}
                            onChange={e => {
                              this.setState({
                                search: {
                                  ...this.state.search,
                                  searchSubject: e.target.value
                                }
                              });
                            }}
                            />
                            </div>
                            <InputGroupAddon className="col-2 " addonType="prepend">
                                  <Button
                                    type="button"
                                    color="primary"
                                    onClick={this.handleSearchUser.bind(this)}
                                  >
                                    <i className="fa fa-search" />{" "}
                                    {i18n.t("layout_common.search")}
                                  </Button>
                                </InputGroupAddon>
                            </div>



              </CardHeader>
              <CardBody className="mt-1 pt-0">
                {/* get user  */}
                <div hidden={users.msg.error.message === "" ? true : false}>
                  <p style={{ color: "red" }}>{users.msg.error.message}</p>
                </div>
                <div hidden={users.msg.success.message === "" ? true : false}>
                  <p style={{ color: "green" }}>{users.msg.success.message}</p>
                </div>

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
                    {userList.length > 0
                      ? userList.map((user, index) => (
                          <UserRow
                            key={index}
                            userKey={index}
                            user={user}
                          />
                        ))
                      : null}
                  </tbody>
                </Table>
                <div  className="col-6 offset-3 text-center">
                <PaginationBox
                  start={userLocals.paging.start}
                  end={userLocals.paging.end}
                  total={users.totalPage}
                  active={userLocals.paging.active}
                  handleNext={this.handleNextUserPage.bind(this)}
                  handlePrev={this.handlePrevUserPage.bind(this)}
                  handlePageClick={this.handlePageUserClick.bind(this)}
                />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
    }
  }
}

export default connect(state => ({
  users: state.ManagerUserReducer.users,
}))(Teacher);
