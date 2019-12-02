import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.PureComponent {

    render(){
        return <>
            <Link to="/profile" className="brand-title">
                Go to profile
            </Link>
        </>
         
    }
}

export default Home;