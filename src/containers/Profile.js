import { connect } from 'react-redux'
import Profile from '../components/profile/Profile'
import { handleLogout } from '../actions/login'


const mapStateToProps = state => ({
    store: state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(handleLogout())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

