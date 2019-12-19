import React from 'react';
import { connect } from 'react-redux'
import {Tab, Tabs} from 'react-bootstrap'
import ChangeBasicInfo from './ChangeBasicInfo'
import ChangePassword from './ChangePassword'
import ChangeAvatar from './ChangeAvatar'
import './Profile.scss'
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
                        <Tab eventKey="home" title="Basic information" className="pt-5">
                            <ChangeBasicInfo/>
                        </Tab>
                        <Tab eventKey="profile" title="Password" className="pt-5">
                            <ChangePassword/>
                        </Tab>
                        <Tab eventKey="contact" title="Avatar" className="pt-5" >
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

