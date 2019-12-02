import { connect } from 'react-redux'
import Register from '../components/register/Register'
import * as actions from '../actions/login'


const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: () => {
            dispatch(actions.handleLogin())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);

