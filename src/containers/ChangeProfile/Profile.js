import React from 'react';
import { connect } from 'react-redux'
import {Tab, Tabs} from 'react-bootstrap'
import ChangeBasicInfo from './ChangeBasicInfo'
import ChangePassword from './ChangePassword'
import ChangeAvatar from './ChangeAvatar'
// import { getUser, updateProfile, updatePassword, updateAvatar } from '../../api/admin.action'
// import { hashPassword } from '../../utils/utils';
import './Profile.scss'
// import * as actions from '../../actions/index'
import Header from '../Header'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

   
    render() {
       
        return (
            <div className="">
                <Header/>
                <div className="loginModal profile-container mt-5">
                    <div className="loginT mt-5 change-profile-title" >Change Profile</div>

                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        <Tab eventKey="home" title="Basic information">
                            <ChangeBasicInfo/>
                        </Tab>
                        <Tab eventKey="profile" title="Password">
                            <ChangePassword/>
                        </Tab>
                        <Tab eventKey="contact" title="Avatar" >
                            <ChangeAvatar/>
                        </Tab>
                    </Tabs>

                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    store: state.login
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logout: () => {
//             dispatch(actions.logOutRequest())
//         },
//     }
// }


export default connect(mapStateToProps, null)(Profile);

