import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Profile from '../components/Profile/Profile'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(actions.logOutRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

