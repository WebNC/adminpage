import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Skills from '../components/Skills/Skills'


const mapStateToProps = state => ({
    skills: state.skills
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
        getSkill: () => {
            dispatch(actions.getSkill())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

