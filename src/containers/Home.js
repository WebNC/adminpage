import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends React.PureComponent {

    render(){
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


const mapStateToProps = state => ({
    store: state.login
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }


export default connect(mapStateToProps, null)(Home);

