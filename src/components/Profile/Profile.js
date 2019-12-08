import React from 'react';
import { getUser } from '../../api/admin.action'
import './Profile.scss'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            address:'address',
            age: 20,
            phone: 34567890,
        };
    }

    componentDidMount = () => {
        const username = localStorage.getItem("username")
        // get user ID - get infor
        getUser().then(res => {
            if (res) {
                const users = res;
                if (users) {
                    const user = users.find(e => {
                        if (e.username === username)
                            return e;
                        return null;
                    });
                    this.setState({
                        username: user.username,
                    })

                }
            }

        })

        this.setState({
            username
        })
    }


    render() {
        const { username,  phone,age,address } = this.state
        return (
            <div className="row p-3 profile">
                <div className="col-7">
                    <div className="activeR d-flex">
                        <p className="usernameLabel">USERNAME </p>
                        <p className="value">{username || 'username'}</p>
                    </div>
                    
                    <div className="activeR d-flex">
                        <p className="usernameLabel">PHONE </p>
                        <p  className="value">{phone}</p>
                    </div>
                    <div className="activeR d-flex">
                        <p className="usernameLabel">AGE </p>
                        <p  className="value">{age}</p>
                    </div>
                    
                    <div className="activeR d-flex">
                            <p className="usernameLabel">ADDRESS </p>
                            <p  className="value" >{address}</p>
                    </div>
                    
                    <hr width="300px" />
                    
                </div>

                <div className="col-4">
                    <img src="http://placehold.it/1000" height="120" width="120" alt="avatar" className="avartar"/>
                </div>
                    </div>
         
        );
    }
}

export default Profile;
