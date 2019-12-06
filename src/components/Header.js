import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleLogout = () => {
        const {logout} = this.props;
        localStorage.removeItem("admin")
        logout();
    }

    render(){
        const profile = '';
        return (
            <Navbar bg="light" className="mb-5">
            <Navbar>
                <Link to="/" className="brand-title">
                    HOME PAGE
                </Link>
            </Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown title={profile ? profile.username : 'Username'} id="basic-nav-dropdown" className="mr-3">
                        <NavDropdown.Item  >
                            <Link to="/profile" className="">
                                Change Profile
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>


        )
    }
}

export default Header;