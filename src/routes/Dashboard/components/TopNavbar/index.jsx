import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import logo from '../../../../assets/images/logo_yukstay.svg';

import Auth from '../../../../helper/auth'

class TopNavbar extends Component {

    static propTypes = {
        data: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logOut = () => {
      Auth.logout();
      this.props.history.push({ pathname: '/' });
    }

    render() {
        return (
            <div>
                <Navbar className="top-navbar-dash" color="light" light expand="md">
                    <Container fluid>
                        <NavbarBrand href="/">
                            <img
                                src={logo}
                                height="48"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav className="mr-4">
                                        Notification
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            No Have Notification!
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink href="" onClick={this.logOut}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default TopNavbar;