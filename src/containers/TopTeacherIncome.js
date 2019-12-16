import { connect } from 'react-redux'
import TopTeacherIncome from '../components/TopTeacherIncome/TopTeacherIncome'


const mapStateToProps = state => ({
    store : state.login
})

export default connect(mapStateToProps)(TopTeacherIncome);