import React from 'react';
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './Logo'

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
        const newStyle = {
            boxShadow: '0 14px 30px 0 rgba(0, 0, 0, 0.14)',
        }
        return (
            <div className="" style={newStyle}>
                <Navbar className=" pl-5 pr-5" style={{background:'rgb(164, 208, 238)' }}>
                    <Navbar>
                        <Link to="/"> 
                            <Logo size={50} />
                        </Link>
                        <Link to="/" className="brand-title ml-4">
                            HOME
                        </Link>
                       
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Navbar>

            </div>
          

        )
    }
}

export default Header;