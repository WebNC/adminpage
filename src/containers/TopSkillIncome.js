import { connect } from 'react-redux'
import TopSkillIncome from '../components/TopSkillIncome/TopSkillIncome'


const mapStateToProps = state => ({
    store : state.login
})

export default connect(mapStateToProps)(TopSkillIncome);