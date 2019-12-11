import React from 'react';
import { connect } from 'react-redux'
import { register } from '../../api/admin.action';
import * as actions from '../../actions/index'
import './CreateNewAdmin.scss'

class CreateNewAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
            [e.target.name]: e.target.value,
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
                        username: ''
                    })
                }
            })
        }
       
    }

  

    render() {
        const { username, password, errors, email } = this.state
        const active = username.trim() && password.trim() && email.trim();
        const errorText = errors && <p className="errorNotification">Something is invalid!</p>


        return (
            <div>
              
                <div className="loginT" >Create New Admin </div>
                <div className="errorNotification mt-2 mb-2">{errorText}</div>

                <div className="activeR">
                    <label className="usernameLabel">Username
                    <input type="text" name="username" id="username"
                        placeholder="Enter your username..."
                        onFocus={this.handleFocus}
                        value={username}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>
               
                <div className="activeR">
                    <label className="usernameLabel">Email
                    <input type="email" name="email" id="email"
                        placeholder="Enter your email..."
                        onFocus={this.handleFocus}
                        value={email}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>
              

                <div className="activeR">
                    <label className="passwordLabel">Password
                    <input type="password" name="password" id="password"
                        placeholder="Enter your password..."
                        value={password}
                        onFocus={this.handleFocus}
                        className={errors ? 'errorInput' : 'normalInput'}
                        onChange={this.onChange} />
                    </label>
                   
                </div>
                <div className="d-flex">
                    <button type='button' onClick={this.handleClick} className={active ? 'loginButtonActive' : 'loginButton'}><div className="buttonText mb-5" >Create</div></button>
                    <button type='button' onClick={this.handleCancel} className='loginButtonActive'><div className="buttonText mb-5" >Cancel</div></button>

                </div>
               
                <hr className="mt-2" />
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

