import { connect } from 'react-redux'
import Reports from '../components/Reports/Reports'


const mapStateToProps = state => ({
    store : state.login
})

export default connect(mapStateToProps)(Reports);