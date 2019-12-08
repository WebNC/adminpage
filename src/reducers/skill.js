import * as types from '../constants/index'
import {addSkill, deleteSkill, editSkill } from '../api/admin.action'

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
            addSkill(action.skills)
            return {
                ...state,
            }
    
        default:
            return state
    }  
}

export default skills;
