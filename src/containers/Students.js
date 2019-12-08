import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Students from '../components/Students/Students'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        lockStudent: (id) => {
            dispatch(actions.handleLockStudent(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);

