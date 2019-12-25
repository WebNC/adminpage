import React from 'react';
import {  Input, Button, Icon} from 'antd';
import {getUser, updatePassword} from '../../api/admin.action'
import { Link } from 'react-router-dom'


class ChangePassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newPassword: '',
            retypePassword: '',
            user: {}
        }
    }

    componentDidMount = () =>{
        getUser().then(res=>{ 
            this.setState({
                user: res,
            })
        });
    }

    handleFocus = () => {
        this.setState({
            errorPassword: false,
            success: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleCancelPsw = e => {
        e.preventDefault()
        this.setState({
            newPassword: '',
            retypePassword: '',
            errorPassword: false,
            success: false,
        })
    }



    validatePassword = () => {
        const {  newPassword, retypePassword } = this.state;
        if (newPassword.trim() !== '' && newPassword.indexOf(' ') === -1 && newPassword === retypePassword)
            return true
        return false
    }

    handleChangePsw = e => {
        e.preventDefault()
        if (!this.validatePassword()) {
            this.setState({
                errorPassword: true
            })
        }
        else {
            const { user, newPassword } = this.state;
            if (user) {
                updatePassword(user._id, newPassword).then(res => {
                    if(res.data){
                        this.setState({
                            newPassword: '',
                            retypePassword: '',
                            success: true,
                        })
                    }
                })
            }
        }
    }

    render(){
        const { newPassword, retypePassword, errorPassword, success} = this.state;

        const errorText = errorPassword && <p className="errorNotification">Something is invalid!</p>
        const successText = success && <p className="errorNotification">Change password successfully!</p>


        return (
        <div className="ml-3">
            <div className="errorNotification">{errorText}</div>
            <div className="errorNotification mb-3">{successText}</div>

            <div className="d-flex mt-1">
                <p className="mr-4 item-name">Mật khẩu mới</p>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="newPassword" id="newPassword"
                    type="password"
                    value={newPassword}
                    style={{width: 300}}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                />
            </div>

            <div className="d-flex mt-3">
                <p className="mr-4 item-name">Nhập lại mật khẩu</p>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="retypePassword" id="retypePassword"
                    type="password"
                    value={retypePassword}
                    style={{width: 300}}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                />
            </div>

        
        
            <div className="d-flex mt-5 group-button">
            <Button onClick={this.handleCancelPsw} className="ml-5 mr-3">
                <Link to='/'>Hủy</Link>
            </Button>
            <Button onClick={this.handleChangePsw} disabled={errorPassword}> Cập nhật </Button>
            </div>
        </div>

    
    );

    }
}

export default ChangePassword;