import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/utils.scss'
import { login } from '../../api/admin.action'


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
             handleLogin(email, password);
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
            <div className="loginModal pb-5">
                <div className="loginT mt-3" >Login</div>
                <div className="errorNotification mt-2 mb-2">{errorText}</div>
                <div className="activeR">
                    <label className="usernameLabel">EMAIL
                    <input type="email" name="email" id="email"
                        placeholder="Enter your email..."
                        onFocus={this.handleFocus}
                        value={email}
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

                {/* <div className="mt-4 d-flex">
                    <div className="dontHaveAccount mr-2"> Don't have an account? </div>
                    <Link to="/register" className="register">Register</Link>
                </div> */}


            </div>

        );
    }
}

export default Login;

