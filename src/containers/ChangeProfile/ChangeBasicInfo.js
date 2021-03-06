import React from 'react';
import {  Input, Button, Icon} from 'antd';
import { connect } from 'react-redux'
import {getUser, updateProfile} from '../../api/admin.action'
import { Link } from 'react-router-dom'
import './Profile.scss'



class ChangeBasicInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            username: '',
            address:'',
            age: '',
            phone: '',
            error: false,
            success: false
        }
    }

    componentDidMount = () => {
        getUser().then(res=>{ 
            this.setState({
                user: res,
                username: res.username,
                phone: res.phone||'',
                address: res.address || '',
                age: res.age || ''
            })
        });
        
    }

    handleFocus = () => {
        this.setState({
            error: false,
            success: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleCancelInfor= e => {
        e.preventDefault();
        const {user} = this.state;
        this.setState({
            username: user.username,
            age: user.age || '',
            address: user.address || '',
            phone: user.phone || ''
        })
        
    }


   

    validateInfor = () => {
        const { phone, age} = this.state;
        const isError = /[a-zA-Z]|\s\W|(_)/;
     

        if ( age.toString().search(isError) !== -1 || phone.toString().search(isError) !== -1) {
         this.setState({
            error: true
         })
         return false;
        } 

        
        return true;

    }

    handleChangeInfor = e => {
        e.preventDefault()
        const {user, username, age, phone, address} = this.state;
        if(this.validateInfor()){
            updateProfile(user._id, username, address,+age , +phone).then(res=>
                {
                    if(res.data.user){
                        const newUser = res.data.user;
                        this.setState({
                            user: newUser,
                            username: newUser.username,
                            age: newUser.age,
                            address: newUser.address,
                            phone: newUser.phone,
                            success:  true,
                        })
                    }
                   
              }
               
            )
        }
    }

   

    render(){
        const { username,phone,age,address, error, success } = this.state
        const errorText = error && <p className="errorNotification">Something is invalid!</p>
        const successText = success && <p className="errorNotification">Change Successfully!</p>


        return ( 
        <div className="ml-3">
            <div className="errorNotification">{errorText}</div>
            <div className="errorNotification mb-3">{successText}</div>

            <div className="d-flex mt-1 ">
                <p className="mr-4 item-name">Tên hiển thị</p>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    style={{ width: 380}}
                    name="username" id="username"
                    value={username}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                />
            </div>
            <div className="d-flex mt-3">
                <div className="d-flex">
                    <p className="mr-4 item-name">Số điện thoại</p>
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="phone" id="phone"
                        value={phone}
                        style={{width: 180}}
                        onFocus={this.handleFocus}
                        onChange={this.onChange} 
                    />
                </div>

                <div className="d-flex">
                    <p className="mr-4 ml-5">Tuổi</p>
                    <Input
                        name="age" id="age"
                        value={age}
                        style={{width: 100}}
                        onFocus={this.handleFocus}
                        onChange={this.onChange} 
                    />
                </div>

            </div>
           
            <div className="d-flex mt-3">
                <p className="mr-4 item-name">Địa chỉ</p>
                <Input
                    prefix={<Icon type="home"   style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    name="address" id="address"
                    style={{width: 380}}
                    value={address}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                    />
            </div>

            <div className="d-flex mt-5 group-button">
                <Button onClick={this.handleCancelInfor} className="ml-5 mr-3" >
                    <Link to='/'>Hủy</Link>  
                </Button>
                <Button onClick={this.handleChangeInfor} disabled={error} > Cập nhật </Button>
            </div>

        </div>
       
       )
    }
}



const mapStateToProps = state => ({
    user : state.login
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//         handleLogin: (email, user) => {
//             dispatch(actions.handleLoginRequest(email, user))
//         }
//     }
// }

export default connect(mapStateToProps, null)(ChangeBasicInfo);

