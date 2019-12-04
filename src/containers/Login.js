import { connect } from 'react-redux'
import Login from '../components/login/Login'
import * as actions from '../actions/login'



const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password) => {
            dispatch(actions.handleLogin(email, password))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

