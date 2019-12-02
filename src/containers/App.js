import { connect } from 'react-redux'
import App from '../App'


const mapStateToProps = state => ({
    store: state.login,
})


export default connect(mapStateToProps, null)(App);

