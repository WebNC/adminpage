import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Skills from '../components/Skills/Skills'


const mapStateToProps = state => ({
    store : state.login
})

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSkill: (skill) => {
            dispatch(actions.handleDeleteSkill(skill))
        },
        addSkill: (skill) => {
            dispatch(actions.addSkill(skill))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

