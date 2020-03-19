import React, { Component } from 'react';
import { ButtonDropdow } from 'reactstrap';
import '../../../css/button.css'
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
} from 'reactstrap';
class Review extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">

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
                    <Input type="email" id="input2-group3" name="input2-group3" />
                    <InputGroupButtonDropdown addonType="append"
                      isOpen={this.state.second}
                      toggle={() => { this.setState({ second: !this.state.second }); }}>
                      <DropdownToggle className="fa fa-caret-down">

                      </DropdownToggle>
                      <DropdownMenu className={this.state.second ? 'show' : ''}>
                        <DropdownItem>SOICT</DropdownItem>
                        <DropdownItem>SAMI</DropdownItem>
                        <DropdownItem>SET</DropdownItem>
                        <DropdownItem>SEP</DropdownItem>
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
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
                    <Input type="text" id="username2" name="username2" autoComplete="name" />
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            </FormGroup>
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
                    <Input type="email" id="input2-group3" name="input2-group3" placeholder="Enter course ID" />

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
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />No
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
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />Yes
                        </Button>
                </FormGroup>
                <FormGroup check inline>
                  <Button className="button-check">
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />No
                        </Button>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="font-title">Date Created</div>
              </Col>
              <Col xs="12" md="9">
                <Input type="date" id="date-input" name="date-input" placeholder="date" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                <div className="font-title">To be more specific</div>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                  placeholder="Review..." />
              </Col>
            </FormGroup>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <FormGroup row>
              <Col md="2">
                <div className="font-title">Rating Subject</div>
              </Col>
              <Col xs="12" md="9">

                <div className="slidecontainer">
                  <input type="range" min="1" max="10" value="5" className="slider" id="myRange"></input>
                </div>

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <div className="font-title">Rating Professor</div>
              </Col>
              <Col xs="12" md="9">
                <div className="slidecontainer">
                  <input type="range" min="1" max="10" value="5" className="slider" id="myRange"></input>
                </div>
              </Col>
            </FormGroup>
          </Form>
          <br />
          <br />


          <Row >
            <Col className="button-last">
              <Button type="submit" size="md" color="primary" className="hust-bg-last"><i className="fa fa-dot-circle-o"></i> Submit</Button>
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

export default Review;
