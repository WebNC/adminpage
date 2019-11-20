import React from 'react';
import '../login/Login.scss'
import { Link } from 'react-router-dom'
// import { register } from '../../api/userAction'




class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: false
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
        const { username, password } = this.state;
        // register(username, password).then(res => {
        //     if (res) {
        //         this.props.handleLogin();
        //     } else {
        //         this.setState({
        //             errors: true
        //         })
        //     }
        // })


    }


    render() {
        const { username, password, errors } = this.state
        const active = username.trim() && password.trim();
        const errorText = errors && <p className="errorNotification">Your username/password is invalid!</p>


        return (

            <div className="loginModal ">
                <div className="loginT mt-5" >Register</div>
                <div className="errorNotification mt-2 mb-2">{errorText}</div>

                <div className="activeR">
                    <label className="usernameLabel">USERNAME</label>
                    <input type="text" name="username" id="username"
                        placeholder="Enter your username..."
                        onFocus={this.handleFocus}
                        value={username}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                </div>

                <div className="activeR">
                    <label className="passwordLabel">PASSWORD</label>
                    <input type="password" name="password" id="password"
                        placeholder="Enter your password..."
                        value={password}
                        onFocus={this.handleFocus}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                </div>

                <button onClick={this.handleClick} className={active ? 'loginButtonActive' : 'loginButton'}><div className="buttonText mb-5" >Register</div></button>
                <hr className="mt-2"></hr>

                <div className="mt-4 d-flex">
                    <div className="dontHaveAccount mr-2">You have an account? </div>
                    <Link to="/" className="register">Login</Link>

                </div>


            </div>

        );
    }
}

export default Register;

