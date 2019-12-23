import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import { getUser } from '../../api/admin.action'
import MyAvatar from '../MyAvatar/MyAvatar'
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
            this.setState({user: res || {
                username: 'username',
                email: 'email@mail.com'
            } });
        })
    }

    handleLogout = () => {
        const {logout} = this.props;
        localStorage.removeItem("admin")
        logout();
    }

    render() {
        const { user } = this.state
        const style={
            width : '100px',
            textAlign: 'right'
        }
        return (
            <div>
                <h2>Thông tin cá nhân</h2>
                <div className="row p-3 profile">
                    <div className="col-7">
                        <div className=" d-flex ml-5 mt-4">
                            <h6 className="mr-3" style={style}>Tên :</h6>
                            <p className="value">{ user.username }</p>
                        </div>
                        <div className="ml-5 d-flex mt-3">
                            <h6 className="mr-3"style={style}>email :</h6>
                            <p  className="value">{user.email}</p>
                        </div>
                        {
                        user.age ?
                        <div className="ml-5 d-flex mt-3">
                            <h6 className="mr-3"style={style}>Tuổi : </h6>
                            <p  className="value">{user.age}</p>
                        </div> : ' '
                        }
                        {
                        user.phone ?
                        <div className="ml-5 d-flex mt-3">
                            <h6 className="mr-3"style={style}>Số điện thoại : </h6>
                            <p  className="value">{user.phone}</p>
                        </div> : ' '
                        }
                        {
                        user.address ?
                        <div className="ml-5 d-flex mt-3">
                            <h6 className="mr-3"style={style}> Địa chỉ :</h6>
                            <p  className="value">{user.address}</p>
                        </div> : ' '
                        }

                        
                        <hr width="300px" />
                        
                    </div>

                    <div className="col-4">
                        <MyAvatar user={user}/>
                        {/* <img src="http://placehold.it/1000" height="150" width="150" alt="avatar" className="avartar"/> */}
                    </div>
                </div>
                <div className= "row ml-5 pl-5">
                    <Link to="/profile"><Button type="primary">Chỉnh sửa thông tin</Button></Link>
                </div>
            </div>
         
        );
    }
}

export default Profile;
