import { connect } from 'react-redux'
import Contracts from '../components/Contracts/Contracts'


const mapStateToProps = state => ({
    store : state.login
})

export default connect(mapStateToProps)(Contracts);