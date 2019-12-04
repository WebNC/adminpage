import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.PureComponent {

    render(){
        console.log(localStorage.getItem("admin"))
        const isRoot = localStorage.getItem("admin")!== null
        return <>
            <Link to="/profile" className="brand-title">
                Go to profile
            </Link>
            {isRoot && <Link to="/register" className="brand-title">
                Create new admin
            </Link>}
            
            
        </>
         
    }
}

export default Home;