/* eslint-disable no-undef */
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getUser, updateProfile, updatePassword, updateAvatar } from '../api/admin.action'
import { hashPassword } from '../utils/utils';
import './Profile.scss'


import AvatarIMG from './Avatar'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        const {oldUrl} = this.props;
        this.state = {
            user: null,
            username: '',
            password: '',
            newPassword: '',
            retypePassword: '',
            url: oldUrl || 'http://placehold.it/1000'
        };
    }

    handleFocus = () => {
        this.setState({
            errorUsername: false,
            errorPassword: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleCancelUsername = e => {
        e.preventDefault()
        this.setState({
            username: localStorage.getItem('username') || '',
            errorUsername: false,

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

    validateUsername = () => {
        const { username } = this.state;
        if (username.indexOf(' ') !== -1) {
            return false
        }

        return true
    }

    validatePassword = () => {
        const { password, newPassword, retypePassword, user } = this.state;
        if (hashPassword(password) === user.password)
            if (newPassword.indexOf(' ') === -1 && newPassword === retypePassword)
                return true
        return false
    }

    handleChangeUsername = e => {
        e.preventDefault()
        const { user, username } = this.state;
        const {changeUsername} = this.props;
        if (!this.validateUsername()) {
            this.setState({
                errorUsername: true
            })
        } else if (user) {
                user.username = username;
                updateProfile(user).then(res => {
                    if (res === 1) {
                        localStorage.removeItem("username");
                        localStorage.setItem("username", username)
                        changeUsername();

                    }
                })
            }

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
                updatePassword(user).then(res => {
                    if (res === 1) {
                        this.setState({
                            errorPassword: false,
                            password: '',
                            newPassword: '',
                            retypePassword: ''
                        })
                        alert("Change password successfully")
                    } else {
                        this.setState({
                            errorPassword: true
                        })
                    }
                })
            }
        }

    }

    handleLogout = () => {
        const {logout} = this.props;
        logout();
    }

    handleChangeAvatar = () => {
        const { user } = this.state;
        const {profile} = this.props;
        if (user) {
            user.url = profile.url
            updateAvatar(user).then(res => {
                if (res === 1) {
                    alert("update avatar successfully")
                } else {
                    alert("Ops, something wrong when update avatar")

                }
            })
        }
    }

    componentDidMount = () => {
        const username = localStorage.getItem("username")
        getUser().then(res => {
            if (res) {
                const users = res;
                if (users) {
                    const user = users.find(e => {
                        if (e.username === username)
                            return e;
                        return null;
                    });
                    this.setState({
                        user,
                        username: user.username,
                        url: user.url ? user.url : 'http://placehold.it/1000'
                    })

                }
            }

        })

        this.setState({
            username
        })
    }


    render() {
        const { username, password, url, errorPassword, errorUsername, newPassword, retypePassword } = this.state
        const { profile,storeAvatarURL } = this.props
        const active = username && username.trim() !== localStorage.getItem("username")
        const activePsw = password.trim() && newPassword.trim() && retypePassword.trim();

        return (
            <div className="pl-5 pr-5">
                <Navbar bg="light" className="mb-5">
                    <Navbar>
                        <Link to="/" className="brand-title">
                            HOME PAGE
                        </Link>
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title={profile ? profile.username : 'Username'} id="basic-nav-dropdown" className="mr-3">
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <div className="loginModal profile-container mt-5">
                    <div className="loginT mt-5 change-profile-title" >Change Profile</div>
                    <div className="row">
                        <div className="col-7">
                            <div className="activeR">
                                <label className="usernameLabel">USERNAME
                                <input type="text" name="username" id="username"
                                    placeholder="Enter your username..."
                                    onFocus={this.handleFocus}
                                    value={username || 'username'}
                                    className={errorUsername ? 'errorInput' : 'normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               


                            </div>
                            <div className="d-flex pl-4">
                                <button
                                type="button"
                                    onClick={this.handleCancelUsername}
                                    className='loginButtonActive'>
                                    <div className="buttonText mb-4" >Cancel</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={this.handleChangeUsername}
                                    className={active ? 'loginButtonActive' : 'loginButton'}>
                                    <div className="buttonText mb-4" >Change</div>
                                </button>
                            </div>

                            <hr width="300px" />
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
                            <div className="activeR">
                                <label className="passwordLabel">NEW PASSWORD
                                <input type="password" name="newPassword" id="newpassword"
                                    placeholder="Enter new password ... "
                                    value={newPassword}
                                    onFocus={this.handleFocus}
                                    className={errorPassword ? 'errorInput' : 'normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               
                            </div>

                            <div className="activeR">
                                <label className="passwordLabel">NEW PASSWORD
                                <input type="password" name="retypePassword" id="renewpassword"
                                    placeholder="Retype new password ..."
                                    value={retypePassword}
                                    onFocus={this.handleFocus}
                                    className={errorPassword ? 'errorInput' : 'normalInput'}
                                    onChange={this.onChange} />
                                </label>
                               
                            </div>


                        </div>

                        <div className="col-4">
                            <AvatarIMG storeAvatarURL={storeAvatarURL} url={url} />
                            <button
                                type="button"
                                onClick={this.handleChangeAvatar}
                                className='loginButtonActive change-avatar'>Change avatar
                            </button>
                        </div>
                    </div>
                    <div className="d-flex">
                        <button
                        type="button"
                            onClick={this.handleCancelPsw}
                            className='loginButtonActive '>
                            <div className="buttonText mb-5" >Cancel</div>
                        </button>
                        <button
                        type="button"
                            onClick={this.handleChangePsw}
                            className={activePsw ? 'loginButtonActive ' : 'loginButton'}>
                            <div className="buttonText mb-5" >Change</div>
                        </button>

                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;

