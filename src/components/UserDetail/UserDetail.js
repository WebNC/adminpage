/* eslint-disable camelcase */
import React from 'react';
import Header from '../../containers/Header'
import {getUserDetail} from '../../api/admin.action'
import './UserDetail.scss'

class UserDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            information:{}
        }
    }

    UNSAFE_componentWillMount = () =>{
        const{location}=this.props
        const id = location.pathname
        getUserDetail(id).then(res=>{
            console.log(res.data.message)
            this.setState({
                information: res.data.message
            })
        })

    }



    render(){
        const { information} = this.state
        // console.log(this.props)
        return (
            <div className="user-detail">
                <Header/>
                <h2 className="ml-5 mt-3 mb-5">User information</h2>
                <div className="row p-3 profile">
                    <div className="col-6">
                        <div className="activeR d-flex">
                            <p className="usernameLabel">USERNAME </p>
                            <p className="value">{`${information.username  } - ${  information.type}`}</p>
                        </div>
                        <div className="activeR d-flex">
                            <p className="usernameLabel">EMAIL </p>
                            <p className="value">{information.email}</p>
                        </div>

                        <div className="activeR d-flex">
                            <p className="usernameLabel">GENDER </p>
                            <p className="value">{information.sex|| `Nam`}</p>
                        </div>

                        <div className="activeR d-flex">
                            <p className="usernameLabel">LOCKED </p>
                            <p className="value">{information.isBlocked ? 'True' : 'False'}</p>
                        </div>

                        <div className="activeR d-flex">
                            <p className="usernameLabel">PHONE </p>
                            <p  className="value">{information.phone || '01234xxxx'}</p>
                        </div>
                        <div className="activeR d-flex">
                            <p className="usernameLabel">AGE </p>
                            <p  className="value">{information.birthday || '20'}</p>
                        </div>
                        
                        <div className="activeR d-flex">
                                <p className="usernameLabel">ADDRESS </p>
                                <p  className="value" >{information.major || 'HCM'}</p>
                        </div>
                        
                        <hr width="300px" />
                        
                    </div>

                    <div className="col-6">
                        <img src="http://placehold.it/1000" height="120" width="120" alt="avatar" className="avartar"/>
                        {
                           ( information.type === 'Người dạy') ?
                            <div className="mt-5">
                                 <div className="activeR d-flex">
                                    <p className="usernameLabel">MAJOR </p>
                                    <p className="value">{information.major}</p>
                                </div>
                                <div className="activeR d-flex">
                                    <p className="usernameLabel">SKILL </p>
                                    <p className="value">{information.major}</p>
                                </div>
                                <div className="activeR d-flex">
                                    <p className="usernameLabel">INTRODUCTION </p>
                                    <p className="value">{information.intro || 'Nothing'}</p>
                                </div>
                            </div> : <></>
                        }
                    
                    </div>
                </div>
            
                

            </div>
          

        )
    }
}

export default UserDetail;