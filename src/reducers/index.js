import { combineReducers } from 'redux'
import login from './login'
import skills from './skill'
import teachers from './teachers'
import students from './students'


const rootReducer = combineReducers({
    login,
    skills,
    teachers,
    students
})

export default rootReducer;