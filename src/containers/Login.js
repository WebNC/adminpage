import { connect } from 'react-redux'
import Login from '../components/login/Login'
import * as actions from '../actions/login'



const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: () => {
            dispatch(actions.handleLogin())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

