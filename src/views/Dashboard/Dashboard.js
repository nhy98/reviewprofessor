import React, { Component, lazy, Suspense } from 'react';
import {
  Container,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import '../../css/stylesheet.css';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="4" lg="4" xl="5">
                <Card className="mx-4 shadow-box login-bg rounded-border">
                  <CardBody className="p-4 mb-2">
                      <h1 className="text-white text-center mb-4">Welcome to Teacher Review!</h1>

                      <Button className="col-4 mr-2 shadow-box text-white register-bg"><Link className="text-white" to='/teachers'>Teachers</Link></Button>
                      <Button className="col-3 mr-2 shadow-box text-white register-bg"><Link className="text-white" to='/classes'>Classes</Link></Button>
                      <Button className="col-4 mr-2 shadow-box text-white register-bg"><Link className="text-white" to='/review/list'>Reviews</Link></Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Dashboard;
