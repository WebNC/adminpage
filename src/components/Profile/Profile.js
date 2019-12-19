import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import { getUser } from '../../api/admin.action'
import './Profile.scss'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount = () => {
        getUser().then(res => {
            this.setState({user: res });
        })
    }

    handleLogout = () => {
        const {logout} = this.props;
        localStorage.removeItem("admin")
        logout();
    }

    render() {
        const { user } = this.state
        return (
            <div>
                <h2>Profile</h2>
                <div className="row p-3 profile">
                    <div className="col-7">
                        <div className="activeR d-flex">
                            <p className="usernameLabel">USERNAME </p>
                            <p className="value">{ user.username }</p>
                        </div>
                        <div className="activeR d-flex">
                            <p className="usernameLabel">EMAIL </p>
                            <p  className="value">{user.email}</p>
                        </div>
                        {
                        user.phone ?
                        `<div className="activeR d-flex">
                            <p className="usernameLabel">PHONE </p>
                            <p  className="value">{user.phone}</p>
                        </div>` : ' '
                        }
                        <hr width="300px" />
                        
                    </div>

                    <div className="col-4">
                        <img src="http://placehold.it/1000" height="150" width="150" alt="avatar" className="avartar"/>
                    </div>
                </div>
                <div className= "row ml-5">
                    <Link to="/profile"><Button>Edit Profile</Button></Link>
                </div>
            </div>
         
        );
    }
}

export default Profile;
