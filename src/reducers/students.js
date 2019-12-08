import * as types from '../constants/index'

const initialState = {
    students: []
}

const students = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOCK_STUDENT:
            return {
                ...state,
            }
    
        default:
            return state
    }  
}

export default students;
