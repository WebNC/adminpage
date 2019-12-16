import React from 'react';
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


    render() {
        const { user } = this.state
        return (
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
                    {/* <div className="activeR d-flex">
                        <p className="usernameLabel">AGE </p>
                        <p  className="value">{age}</p>
                    </div>
                    
                    <div className="activeR d-flex">
                            <p className="usernameLabel">ADDRESS </p>
                            <p  className="value" >{address}</p>
                    </div>
                     */}
                    <hr width="300px" />
                    
                </div>

                <div className="col-4">
                    <img src="http://placehold.it/1000" height="150" width="150" alt="avatar" className="avartar"/>
                </div>
                    </div>
         
        );
    }
}

export default Profile;
