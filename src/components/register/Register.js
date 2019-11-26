import React from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api/admin.action';
 
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: false,
            email: '',
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
        const { username, password, email, phone } = this.state;
        register(username, password, email, phone).then(res => {
    
               if(!res){
               this.setState({errors: true})
           }
           else{
               console.log(res.data);
           }
        })


    }


    render() {
        const { username, password, errors, email, phone } = this.state
        const active = username.trim() && password.trim();
        const errorText = errors && <p className="errorNotification">Something is invalid!</p>


        return (
            <div className="loginModal pb-5">
                <div className="loginT mt-5" >Register</div>
                <div className="errorNotification mt-2 mb-2">{errorText}</div>

                <div className="activeR">
                    <label className="usernameLabel">USERNAME
                    <input type="text" name="username" id="username"
                        placeholder="Enter your username..."
                        onFocus={this.handleFocus}
                        value={username}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>
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

                <button type='button' onClick={this.handleClick} className={active ? 'loginButtonActive' : 'loginButton'}><div className="buttonText mb-5" >Register</div></button>
                <hr className="mt-2" />

                <div className="mt-4 d-flex">
                    <div className="dontHaveAccount mr-2">You have an account? </div>
                    <Link to="/" className="register">Login</Link>

                </div>


            </div>

        );
    }
}

export default Register;

