/* eslint-disable camelcase */
import React from 'react';
 
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           value:'',
        };
    }

    handleFocus = () => {
        this.setState({
            value: ''
        })
    }

    onChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    render() {
        const {label,type, name, id , className} = this.props;
        const {value}=this.state;
        return (
            <div className="activeR">
                    <label className="passwordLabel">{label}
                    <input type={type} name={name} id={id}
                        placeholder={`Enter your ${name}...`}
                        value={value}
                        onFocus={this.handleFocus}
                        className={className}
                        onChange={this.onChange} />
                    </label>
                   
            </div>
        );
    }
}

export default Register;

