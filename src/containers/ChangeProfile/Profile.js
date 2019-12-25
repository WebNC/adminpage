import React from 'react';
import { connect } from 'react-redux'
import {Tab, Tabs} from 'react-bootstrap'
import ChangeBasicInfo from './ChangeBasicInfo'
import ChangePassword from './ChangePassword'
// import ChangeAvatar from './ChangeAvatar'
import './Profile.scss'
import Header from '../Header'
// import MyFooter from '../../components/Footer'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

   
    render() {
       
        return (
            <div className="contain">
                <Header/>
                <div className="loginModal profile-container mt-5">
                    <div className="loginT mt-3 change-profile-title" >Change Profile</div>

                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        <Tab eventKey="home" title="Thông tin cá nhân" className="pt-3">
                            <ChangeBasicInfo/>
                        </Tab>
                        <Tab eventKey="profile" title="Mật khẩu" className="pt-3">
                            <ChangePassword/>
                        </Tab>
                        {/* <Tab eventKey="contact" title="Avatar" className="pt-5" >
                            <ChangeAvatar/>
                        </Tab> */}
                    </Tabs>


                </div>
                {/* <div className="footer">
                <MyFooter />
                </div>                 */}
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

