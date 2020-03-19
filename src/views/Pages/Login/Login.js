import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row ,FormGroup,
  Label } from 'reactstrap';
import '../../../css/stylesheet.css';
import loginService from "../../../services/LoginService";
import LoadingSpinner from "../../components/PopupLoading";
import loadingAction from "../../../actions/LoadingAction";
import CardError from "../../components/CardError";
import constants from "../../../utils/Constants";
import stateUtils from "../../../utils/StateUtils";
import i18n from "../../components/I18n";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isRemember: false,
      language: "en",
      errorList: []
    };
    // i18n.changeLanguage(this.state.language);
  }
  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password, isRemember } = this.state;
    dispatch(loadingAction.setLoadingPopup(true));
    stateUtils.clearErrLogin();
    // Caott Add
    // loginService.login(username, password, isRemember, dispatch);
    if (!username) {
      this.setState({
        errorList: [i18n.t("layout_login.user_name_empty")]
      });
    }
    if (!password) {
      this.setState({
        errorList: [i18n.t("layout_login.pass_word_empty")]
      });
    }
    if (username && password) {
      if (isRemember) {
        localStorage.setItem("autoLogin", 0); //0: waiting, 1: autologin, 2 : not auto login
        localStorage.setItem(constants.REMEMBER, "true");
      } else {
        localStorage.setItem("autoLogin", 2);
        localStorage.setItem(constants.REMEMBER, "false");
      }
      loginService.loginHandle(username, password, isRemember, dispatch);
    }
  }
  onChangeUsername(username) {
    this.setState({ username: username.trim() });
  }
  onChangePassword(password) {
    this.setState({ password: password.trim() });
  }
  setError() {
    const { dispatch } = this.props;
    loginService.setErrorLogin("", dispatch);
  }
  componentDidMount() {
    // const token = localStorage.getItem("token");
    // const { dispatch } = this.props;
    // loginService.autoLogin(token, dispatch);
    this.setState({ errorList: [] });
    //stateUtils.clearErr();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
    this.state.errorList = [];
    // this.setState({ errorList: [] });
  }
  render() {
    const { isRemember, loading } = this.state;
    const { error, errorCodeLst } = this.props;
    for (let i in errorCodeLst) {
      this.state.errorList.push(i18n.t("msg_error." + errorCodeLst[i]));
    }

    return (
      <div className="app flex-row align-items-center hust-bg">
        <Container>
          <Row className="justify-content-center">
            <Col md="9">
              <CardGroup className="shadow-box  ">
                <Card className="p-4 login-bg rounded-border">
                  <CardBody>
                    <Form onSubmit={this.login.bind(this)}>
                      <h1 className="text-white ">Teacher Review</h1>
                      <InputGroup className="my-3 opaque-bg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                            placeholder="username (*)"
                            autoComplete="username"
                            maxLength={50}
                            value={this.state.username}
                            onChange={e =>
                              this.onChangeUsername(`${e.target.value}`)
                            } />
                      </InputGroup>
                      <InputGroup className="mb-4 opaque-bg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                            placeholder="password (*)"
                            maxLength={50}
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={e =>
                              this.onChangePassword(`${e.target.value}`)
                            } />
                      </InputGroup>
                      <Row>
                        <Col xs="5">
                          <Button className="px-4 opaque-bg text-white shadow-box register-bg" onClick={this.login.bind(this)}>LOG IN</Button>
                        </Col>
                        <Col xs="2 mt-2">
                        <Form check className="checkbox opaque-bg">
                          <Input
                            className="form-check-input  "
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            checked={isRemember}
                            value={isRemember}
                            onChange={() =>
                              this.setState({
                                isRemember: !isRemember
                              })
                            }
                          />
                          <Label
                            check
                            className="form-check-label text-white"
                            htmlFor="checkbox1"
                          >
                            Remember
                          </Label>
                        </Form>
                        </Col>
                        <Col xs="5" className="text-right ">
                          <Button color="link" className="px-0 text-white opaque-bg">Forget your password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white register-bg rounded-border py-5 d-md-down-none shadow-box" style={{ width: '44%' }}>
                  <CardBody className="text-center p-5">
                    <div>
                      <h2 className="mt-3 mb-1">Have no account?</h2>
                      <p className="mb-2">Register right now to mark our dear teachers!</p>
                      <Link to="/register">
                        <Button className="hust-bg shadow-box " active tabIndex={-1}>REGISTER NOW</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(state => ({
  loginSuccess: state.LoginReducer.loginSuccess,
  error: state.LoginReducer.error,
  loading: state.LoadingReducer.loading,
  errorCodeLst: state.MessageErrorReducer.errorCodes
}))(Login);
