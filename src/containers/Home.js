import { connect } from 'react-redux'
import Home from '../components/home/Home'


const mapStateToProps = state => ({
    store: state.login
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }


export default connect(mapStateToProps, null)(Home);

