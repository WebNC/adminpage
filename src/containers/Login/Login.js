import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Icon} from 'antd';
import {login} from '../../api/admin.action'
import * as actions from '../../actions/index'
import Logo from '../../components/Logo'

import '../../utils/utils'
import './Login.css'



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            errors: false,
            email: '',
        };
    }

    handleFocus = e => {
        this.setState({
            [e.target.name]: '',
            errors: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleClick = e => {
        e.preventDefault()
        const {handleLogin} = this.props;
        const { email, password } = this.state;
        login(email, password).then(res => {
            if(!res){
                this.setState({errors: true})
            }
            else{
             handleLogin(email, res.data.user);
             this.setState({
                 email: '',
                 password: ''
                })
            }
        })
    }


    render() {
        const {password, errors, email } = this.state
        const active = email && password.trim();
        const errorText = errors && <p className="errorNotification">Your email/password is invalid!</p>
        return (                 
            <div className="login-page-component">
                <div className="login-form-component">
                    <div className="left-component">
                        <img src="./login-img.png" alt="" className="login-img" />
                    </div>

                    <Form  className="login-form">
                        <Form.Item className="logo-component"></Form.Item>
                            <Logo size={120} />
                            <div className="errorNotification mt-1">{errorText}</div>
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="email"
                                value={email}
                                className="mt-3"
                                onFocus={this.handleFocus}
                                onChange={this.onChange} 
                                placeholder="Tên đăng nhập"
                                />
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                name="password"
                                value={password}
                                className="mt-3 mb-3"
                                onChange={this.onChange} 
                                onFocus={this.handleFocus}
                                placeholder="Mật khẩu"
                                />
                        <Button type="primary"  onClick={this.handleClick} disabled={!active} className="login-form-button" >
                            Đăng nhập
                        </Button>
                    </Form>
                    
                </div>
            </div> 
         
        );
    }
}


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, user) => {
            dispatch(actions.handleLoginRequest(email, user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

