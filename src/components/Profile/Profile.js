import React from 'react';
import {Button, Icon, Spin} from 'antd';
import {Link} from 'react-router-dom';
import { getUser } from '../../api/admin.action'
import MyAvatar from '../MyAvatar/MyAvatar'
import './Profile.scss'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoading: true,
        };
    }

    componentDidMount = () => {
        getUser().then(res => {
            this.setState({user: res || {
                username: 'username',
                email: 'email@mail.com'
            } ,
            isLoading: false});
        })
    }

    handleLogout = () => {
        const {logout} = this.props;
        localStorage.removeItem("admin")
        logout();
    }

    render() {
        const { user, isLoading } = this.state
        const style={
            width : '100px',
            textAlign: 'right'
        }
        return (
            <>
            {isLoading === true ? (
                <div style={{textAlign: "center"}}>
                    <Spin indicator={antIcon} />
                </div>
            ):(
                <div>
                    <h2>Thông tin cá nhân</h2>
                    <div className="row p-3 profile">
                        <div className="col-7">
                            <div className=" d-flex ml-5 mt-4">
                                <h6 className="mr-3" style={style}>Tên :</h6>
                                <p className="value">{ user.username }</p>
                            </div>
                            <div className="ml-5 d-flex mt-3">
                                <h6 className="mr-3"style={style}>Email :</h6>
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
                                <h6 className="mr-3"style={style}>Phone : </h6>
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
            )}
            </>
            
         
        );
    }
}

export default Profile;
