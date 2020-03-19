import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import constants from "../../utils/Constants";
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import hust_logo from '../../assets/img/brand/logoICT.jpg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import loginService from "../../services/LoginService";
import '../../css/stylesheet.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout() {
    const { dispatch } = this.props;
    localStorage.setItem("autoLogin", 2);
    loginService.logout(dispatch);
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <div className="col-1 ml-3">
        <AppSidebarToggler className="d-lg-none ikon login-bg shadow-box text-white" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none ikon login-bg shadow-box text-white" display="lg" />
        </div>
        <Nav className="d-md-down-none " navbar>
          <NavItem className="">
            <Button className=" mr-1 shadow-box text-white login-bg"><Link className="text-white" to='/dashboard'><i class="fa fa-home fa-1x text-white"></i></Link></Button>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
        <NavItem className="pl-5">
            <NavLink to="/dashboard" className="nav-link">

            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down mr-4">
            <DropdownToggle nav className="pr-4 mr-4">
            <Button className=" mr-1 shadow-box text-white login-bg"><strong>{localStorage.getItem("user")}</strong></Button>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="text-white"><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem className="text-white" onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(state => ({
  token: state.LoginReducer.token
}))(DefaultHeader);
