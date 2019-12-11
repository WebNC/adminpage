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
        const newStyle = {
            boxShadow: '0 14px 30px 0 rgba(0, 0, 0, 0.14)'
        }
        const navDropdown = {
            textDecoration: 'none',
            color: "#202124"
        }
        return (
            <div className="" style={newStyle}>
                <Navbar className="mb-3 pl-5 pr-5" style={{background:'rgb(164, 208, 238)' }}>
                    <Navbar>
                        <Link to="/" className="brand-title">
                            HOME
                        </Link>
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title={profile ? profile.username : 'Username'} id="basic-nav-dropdown" className="mr-3">
                                <NavDropdown.Item  >
                                    <Link to="/profile" style={navDropdown}>
                                        Change Profile
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
          

        )
    }
}

export default Header;