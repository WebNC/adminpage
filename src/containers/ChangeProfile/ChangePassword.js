import React from 'react';


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

    
    // handleCancelPsw = e => {
    //     e.preventDefault()
    //     this.setState({
    //         password: '',
    //         newPassword: '',
    //         retypePassword: '',
    //         errorPassword: false
    //     })
    // }

    
    // validatePassword = () => {
    //     const { password, newPassword, retypePassword, user } = this.state;
    //     if (hashPassword(password) === user.password)
    //         if (newPassword.indexOf(' ') === -1 && newPassword === retypePassword)
    //             return true
    //     return false
    // }


    
    // handleChangePsw = e => {
    //     e.preventDefault()
    //     if (!this.validatePassword()) {
    //         this.setState({
    //             errorPassword: true
    //         })
    //     }
    //     else {
    //         const { user, newPassword } = this.state;
    //         if (user) {
    //             user.password = newPassword;
    //             updatePassword(user).then(res => {
    //                 if (res === 1) {
    //                     this.setState({
    //                         errorPassword: false,
    //                         password: '',
    //                         newPassword: '',
    //                         retypePassword: ''
    //                     })
    //                     alert("Change password successfully")
    //                 } else {
    //                     this.setState({
    //                         errorPassword: true
    //                     })
    //                 }
    //             })
    //         }
    //     }

    // }



    render(){
        const {password, newPassword, retypePassword, errorPassword} = this.state;
        const activePsw = password.trim() && newPassword.trim() && retypePassword.trim();

        return (
            <div>
          
          <div className="activeR">
                                <label className="passwordLabel">PASSWORD
                                <input type="password" name="password" id="password"
                                    placeholder="Enter your password..."
                                    value={password}
                                    onFocus={this.handleFocus}
                                    className={errorPassword ? 'errorInput' : 'normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               
                            </div>
                           
                           <div className="d-flex">
                           <div className="activeR">
                                <label className="passwordLabel">NEW PASSWORD
                                <input type="password" name="newPassword" id="newpassword"
                                    placeholder="Enter new password ... "
                                    value={newPassword}
                                    onFocus={this.handleFocus}
                                    className={errorPassword ? 'errorInput' : 'pass normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               
                            </div>
                            <div className="activeR">
                                <label className="passwordLabel">NEW PASSWORD
                                <input type="password" name="retypePassword" id="renewpassword"
                                    placeholder="Retype new password ..."
                                    value={retypePassword}
                                    onFocus={this.handleFocus}
                                    className={errorPassword ? 'errorInput' : 'pass normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               
                            </div>
                           </div>
                       
           
            <div className="d-flex">
            <button
            type="button"
                onClick={this.handleCancelPsw}
                className='login-button-active'>
                <div className="buttonText " >Cancel</div>
            </button>
            <button
            type="button"
                onClick={this.handleChangePsw}
                className={activePsw ? 'login-button-active ' : 'login-button'}>
                <div className="buttonText" >Change</div>
                
            </button>

            </div>
            </div>
        );

    }
}

export default ChangePassword;