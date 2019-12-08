import * as types from '../constants/index'
import {addSkill, deleteSkill, editSkill, getSkill } from '../api/admin.action'



const initialState =[{}]

const skills = (state = initialState, action ) => {

    switch (action.type) {
        case types.DELETE_SKILL:
            deleteSkill(action.id)
            return [...state]
        case types.ADD_SKILL:
            addSkill(action.name)
            return [...state]
        default:
            return state

    }  
}

export default skills;
