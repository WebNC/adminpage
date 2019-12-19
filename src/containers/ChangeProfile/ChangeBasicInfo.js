import React from 'react';
import {  Input, Button, Icon} from 'antd';
import './Profile.scss'



class ChangeBasicInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            address:'',
            age: '',
            phone: '',
            error: false,
        }
    }

    handleFocus = () => {
        this.setState({
            error: false,
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleCancelInfor= e => {
        e.preventDefault()
    }

    validateInfor = () => {
    }

    handleChangeInfor = e => {
        e.preventDefault()
    }

    componentDidMount = () => {
      
    }

    render(){
        const { username,phone,age,address, error } = this.state

        return ( 
        <div className="ml-5">
      
            <div className="d-flex ">
                <p className="mr-4 item-name">Username</p>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    style={{ width: 380}}
                    name="username" id="username"
                    value={username}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                />
            </div>
            <div className="d-flex mt-3">
                <div className="d-flex">
                    <p className="mr-4 item-name">Phone</p>
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="phone" id="phone"
                        value={phone}
                        style={{width: 180}}
                        onFocus={this.handleFocus}
                        onChange={this.onChange} 
                    />
                </div>

                <div className="d-flex">
                    <p className="mr-4 ml-5">Age</p>
                    <Input
                        name="age" id="age"
                        value={age}
                        style={{width: 100}}
                        onFocus={this.handleFocus}
                        onChange={this.onChange} 
                    />
                </div>

            </div>
           
            <div className="d-flex mt-3">
                <p className="mr-4 item-name">Address</p>
                <Input
                    prefix={<Icon type="home"   style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    name="address" id="address"
                    style={{width: 380}}
                    value={address}
                    onFocus={this.handleFocus}
                    onChange={this.onChange} 
                    />
            </div>

            <div className="d-flex mt-5 group-button">
                <Button onClick={this.handleCancelInfor} className="ml-5 mr-3"> Cancel </Button>
                <Button onClick={this.handleChangeInfor} disabled={error} > Change </Button>
            </div>

        </div>
       
       )
    }
}

export default ChangeBasicInfo;