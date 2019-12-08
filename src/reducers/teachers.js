import * as types from '../constants/index'

const initialState = {
    teachers: []
}

const teachers = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOCK_TEACHER:
            return {
                ...state,
            }
    
        default:
            return state
    }  
}

export default teachers;
