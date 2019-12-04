import { connect } from 'react-redux'
import Register from '../components/register/Register'
import * as actions from '../actions/index'


const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: (username, email, password) => {
            dispatch(actions.handleRegisterRequest(username, email, password)) 
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);

