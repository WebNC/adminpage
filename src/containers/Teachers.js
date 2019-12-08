import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Teachers from '../components/Teachers/Teachers'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        lockTeacher: (username) => {
            dispatch(actions.handleLockTeacher(username))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);

