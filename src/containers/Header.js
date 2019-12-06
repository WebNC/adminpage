import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Header from '../components/Header'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actions.logOutRequest())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

