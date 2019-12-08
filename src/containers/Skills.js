import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Skills from '../components/Skills/Skills'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSkill: (id) => {
            dispatch(actions.handleDeleteSkill(id))
        },
        addSkill: (name) => {
            dispatch(actions.handleAddSkill(name))
        },
        editSkill: (id,value) => {
            dispatch(actions.handleEditSkill(id, value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

