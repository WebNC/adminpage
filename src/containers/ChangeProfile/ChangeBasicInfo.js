import React from 'react';


class ChangeBasicInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            address:'',
            age: '',
            phone: '',
        }
    }

     handleFocus = () => {
        this.setState({
            errorUsername: false,
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    
    // handleCancelInfor= e => {
    //     e.preventDefault()
    //     this.setState({
    //         username: localStorage.getItem('username') || 'username',
    //         errorUsername: false,
    //         phone: 0,
    //         age: 0,
    //         address: ''

    //     })
    // }

      // validateInfor = () => {
    //     const { username } = this.state;
    //     if (username.indexOf(' ') !== -1) {
    //         return false
    //     }
    //     return true
    // }


       // handleChangeInfor = e => {
    //     e.preventDefault()
    //     const { user, username } = this.state;
    //     const {changeUsername} = this.props;
    //     if (!this.validateInfor()) {
    //         this.setState({
    //             errorUsername: true
    //         })
    //     } else if (user) {
    //             user.username = username;
    //             updateProfile(user).then(res => {
    //                 if (res === 1) {
    //                     localStorage.removeItem("username");
    //                     localStorage.setItem("username", username)
    //                     changeUsername();

    //                 }
    //             })
    //         }

    // }


    
    // componentDidMount = () => {
    //     const username = localStorage.getItem("username")
    //     // get user ID - get infor
    //     getUser().then(res => {
    //         if (res) {
    //             const users = res;
    //             // if (users) {
    //             //     const user = users.find(e => {
    //             //         if (e.username === username)
    //             //             return e;
    //             //         return null;
    //             //     });
    //             //     this.setState({
    //             //         user,
    //             //         username: user.username,
    //             //         url: user.url ? user.url : 'http://placehold.it/1000'
    //             //     })

    //             // }
    //         }

    //     })

    //     this.setState({
    //         username
    //     })
    // }

    render(){
        const { username, errorUsername,phone,age,address } = this.state
        const active = username && username.trim() !== localStorage.getItem("username")

        return (
            <>
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
       
        <div className=" d-flex  ">
            <div className="activeR">
            <label className="passwordLabel">PHONE
            <input type="number" name="phone" id="phone"
                value={phone}
                min={0}
                onFocus={this.handleFocus}
                className={errorUsername ? 'error' : 'normalInput phoneInput'}
                onChange={this.onChange} />
            </label>
            </div>
            <div className="activeR">
                
            <label className="passwordLabel ml-auto">AGE
            <input type="number" name="age" id="age"
                value={age}
                min={0}
                onFocus={this.handleFocus}
                className={errorUsername ? 'errorInput' : 'normalInput ageInput'}
                onChange={this.onChange} />
            </label>
            </div>
        </div>
       
        <div className="activeR">
            <label className="passwordLabel">ADDRESS
            <input type="text" name="address" id="address"
                placeholder="Enter your address ..."
                value={address}
                onFocus={this.handleFocus}
                className={errorUsername ? 'errorInput' : 'normalInput'}
                onChange={this.onChange} />
            </label>
           
        </div>

        <div className="d-flex pl-4">
            <button
            type="button"
                onClick={this.handleCancelInfor}
                className='login-button-active'>
                <div className="buttonText" >Cancel</div>
            </button>
            <button
                type="button"
                onClick={this.handleChangeInfor}
                className={active ? 'login-button-active' : 'login-button'}>
                <div className="buttonText" >Change</div>
            </button>
        </div>

        </>

        )

    }
}

export default ChangeBasicInfo;