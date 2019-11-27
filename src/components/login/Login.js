import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/utils.scss'
import { login } from '../api/admin.action'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            errors: false,
            phone: '',
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
        const { phone, password } = this.state;
        login(phone, password).then(res => {
           if(!res){
               this.setState({errors: true})
           }
        })
    }


    render() {
        const {password, errors, phone } = this.state
        const active = phone && password.trim();
        const errorText = errors && <p className="errorNotification">Your phone/password is invalid!</p>
        return (
            <div className="loginModal pb-5">
                <div className="loginT mt-3" >Login</div>
                <div className="errorNotification mt-2 mb-2">{errorText}</div>
                <div className="activeR">
                    <label className="usernameLabel">PHONE
                    <input type="number" name="phone" id="phone"
                        placeholder="Enter your phone..."
                        onFocus={this.handleFocus}
                        value={phone}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>

                <div className="activeR">
                    <label className="passwordLabel">PASSWORD
                    <input type="password" name="password" id="password"
                        placeholder="Enter your password..."
                        value={password}
                        onFocus={this.handleFocus}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>

                <button type = 'button' onClick={this.handleClick} className={active ? 'loginButtonActive' : 'loginButton'}><div className="buttonText mb-5" >Login</div></button>
                <hr className="mt-2" />

                <div className="mt-4 d-flex">
                    <div className="dontHaveAccount mr-2"> Don't have an account? </div>
                    <Link to="/register" className="register">Register</Link>
                </div>


            </div>

        );
    }
}

export default Login;

