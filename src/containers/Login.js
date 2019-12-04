import { connect } from 'react-redux'
import Login from '../components/login/Login'
import * as actions from '../actions/index'



const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password) => {
            dispatch(actions.handleLoginRequest(email, password))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

