import { connect } from 'react-redux'
import Profile from '../components/profile/Profile'
import * as actions from '../actions/index'


const mapStateToProps = state => ({
    store: state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actions.logOutRequest())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

