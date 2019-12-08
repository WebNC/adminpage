import * as types from '../constants/index'

const initialState = {
    skills: []
}

const skills = (state = initialState, action ) => {
    switch (action.type) {
        case types.DELETE_SKILL:
            return {
                ...state,
            }
        case types.ADD_SKILL:
            return {
                ...state,
            }
    
        default:
            return state
    }  
}

export default skills;
