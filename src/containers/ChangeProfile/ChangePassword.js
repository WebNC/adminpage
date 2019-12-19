import React from 'react';
import {  Input, Button, Icon} from 'antd';
import { hashPassword } from '../../utils/utils';



class ChangePassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            retypePassword: '',
        }
    }

    handleFocus = () => {
        this.setState({
            errorPassword: false,
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
            password: '',
            newPassword: '',
            retypePassword: '',
            errorPassword: false
        })
    }

    validatePassword = () => {
        const { password, newPassword, retypePassword, user } = this.state;
        if (hashPassword(password) === user.password)
            if (newPassword.indexOf(' ') === -1 && newPassword === retypePassword)
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
                user.password = newPassword;
                // updatePassword(user).then(res => {
                // })
            }
        }
    }

    render(){
        const {password, newPassword, retypePassword, errorPassword} = this.state;
        const activePsw = password.trim() && newPassword.trim() && retypePassword.trim();

        return (
        <div className="ml-5">
      
      <div className="d-flex ">
          <p className="mr-4 item-name">Password</p>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
            style={{ width: 300}}
            name="password" id="password"
            value={password}
            onFocus={this.handleFocus}
            onChange={this.onChange} 
          />
        </div>
        <div className="d-flex mt-3">
            <p className="mr-4 item-name">New Password</p>
            <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="newPassword" id="newPassword"
                value={newPassword}
                style={{width: 300}}
                onFocus={this.handleFocus}
                onChange={this.onChange} 
              />
        </div>

        <div className="d-flex mt-3">
            <p className="mr-4 item-name">Retype</p>
            <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="retypePassword" id="retypePassword"
                value={retypePassword}
                style={{width: 300}}
                onFocus={this.handleFocus}
                onChange={this.onChange} 
            />
          </div>

     
     
        <div className="d-flex mt-5 group-button">
          <Button onClick={this.handleCancelInfor} className="ml-5 mr-3"> Cancel </Button>
          <Button onClick={this.handleChangeInfor}> Change </Button>
         </div>

     </div>
    );

    }
}

export default ChangePassword;