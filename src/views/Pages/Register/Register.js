import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import '../../../css/stylesheet.css';
import Api from "../../../utils/Api";
import axios from 'axios';

const register = axios.create({
    baseURL: `${Api.USERS}/create`
})

class Register extends Component {

    constructor(props) {
       super(props);
       this.handleUsernameChange = this.handleUsernameChange.bind(this);
       this.handleEmailChange = this.handleEmailChange.bind(this);
       this.handlePasswordChange = this.handlePasswordChange.bind(this);
       this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
       this.signIn = this.signIn.bind(this);
       this.check = this.check.bind(this);
       this.state = {
         username: "",
         password: "",
         repeat_password: "",
         email: "",
       };
     }

     handleUsernameChange(e){
    this.setState({username: e.target.value})
}
     handleEmailChange(e){
    this.setState({email: e.target.value})
}
handlePasswordChange(e){
    this.setState({password: e.target.value})
}
handleRepeatPasswordChange(e){
    this.setState({repeat_password: e.target.value})
}


    check(){
        if (!(/^[0-9a-zA-Z]+$/.test(this.state.username))){
            alert("Username can only contain letters or numbers!")
            return false;
        }
        if (this.state.email.length < 11 || !(this.state.email).includes("@gmail.com")){
            alert("Invalid email!")
            return false;
        }
        if (!(this.state.password === this.state.repeat_password)){
            alert("Password does not match!")
            return false;
        }
        return true;
    }

    signIn(){
        if (this.check()){
            let data = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                role: 2
    });
            // console.log(data);
            register.post(`${Api.USERS}/create`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                alert("User created successfully!");
                this.props.history.push('/login')
              }).catch(err => {
                console.log(err.message);
                // console.log(err.response.data);
                // console.log(err.response.status);
                // console.log(err.response.headers);
                alert("Username or email already exist. Please choose another username!");
              });
        }
    }

    render() {
    var {username, email, password } = this.state;
    return (
      <div className="app flex-row align-items-center hust-bg">
        <Container>
          <Row className="justify-content-center">
            <Col md="4" lg="4" xl="5">
              <Card className="mx-4 shadow-box login-bg rounded-border">
                <CardBody className="p-4">
                  <Form>
                    <h1 className="text-white">Register</h1>
                    <p className="text-white opaque-bg">Register now to review teachers!</p>
                    <InputGroup className="mb-3 opaque-bg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="username" onChange={this.handleUsernameChange} autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3 opaque-bg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="email" onChange={this.handleEmailChange} autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3 opaque-bg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="password" onChange={this.handlePasswordChange} autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4 opaque-bg">
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                         <i className="icon-lock"></i>
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input type="password"  onChange={this.handleRepeatPasswordChange} placeholder="repeat password" autoComplete="new-password" />
                   </InputGroup>
                    <Button className="col-12 shadow-box text-white register-bg" onClick={this.signIn}>Register Now!</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
