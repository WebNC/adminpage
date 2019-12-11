import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Icon} from 'antd';

import { register } from '../../api/admin.action';
import * as actions from '../../actions/index'
import './CreateNewAdmin.scss'
import Logo from '../../components/Logo'


class CreateNewAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: false,
            email: '',
            success: false,
         
        };
    }

    handleFocus = e => {
        console.log(e.target.getAttribute('name'))
        this.setState({
            [e.target.getAttribute('name')]: '',
            errors: false,
            success: false
        })
    }

    handleCancel = () => {
        this.setState({
            username: '',
            password: '',
            errors: false,
            email: '',
        })
    }

    onChange = e => {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value,
        })
    }

    handleClick = e => {
        e.preventDefault()
        const { username, password, email } = this.state;
        const {handleRegister} = this.props;
        if(username.trim() && password.trim() && email.trim()){
            register(username, password, email).then(res => {
                if(!res){
                       this.setState({errors: true})
                }
                else{
                    
                    handleRegister(username, email, password);
                    this.setState({
                        email: '',
                        password: '',
                        username: '',
                        success: true
                    })
                }
            })
        }
       
    }

  

    render() {
        const { username, password, errors, email , success} = this.state
        const active = username.trim() && password.trim() && email.trim();

        const errorText = errors && <p className="errorNotification">Something is invalid!</p>;
        const successText = success && <p className="errorNotification">Create admin successfully</p>
   

        return (
            <div className="login-page-component content">
                <div className="login-form-component create-admin">
                    <div className="d-flex">

                        <Form  className="login-form mr-5 ">
                            <div className="title">Create new admin</div>
                            <div className="errorNotification mt-1">{errorText || successText}</div>

                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="email" id="email"
                                value={email}
                                className="mt-2"
                                onFocus={this.handleFocus}
                                onChange={this.onChange} 
                                placeholder="Enter Email"
                                />

                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="username" id="username"
                                className="mt-3"
                                value={username}
                                onFocus={this.handleFocus}
                                onChange={this.onChange} 
                                placeholder="Enter username"
                                />
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" id="password"
                                name="password"
                                value={password}
                                className="mt-3 mb-3"
                                onChange={this.onChange} 
                                onFocus={this.handleFocus}
                                placeholder="Enter password"
                                />
                            <div className="d-flex" style={{paddingRight: '30%'}}>
                                <Button type="primary" onClick={this.handleClick} disabled={!active} className="login-form-button mt-3" >
                                    Create
                                </Button>
                                <Button type="primary"  onClick={this.handleCancel}  className="login-form-button mt-3" >
                                    Cancel
                                </Button>
                            </div>
                            
                        </Form>
                        <div className="mt-5 ml-5">
                            <Logo size={120} />
                        </div>

                    </div>
    
                </div>
        </div> 
     
         
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: (username, email, password) => {
            dispatch(actions.handleRegisterRequest(username, email, password)) 
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAdmin);

