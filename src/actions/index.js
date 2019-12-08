import * as types from '../constants/index';
import {login, register} from  '../api/admin.action'

const handleLogin = (email, password) => {
    return {
        type: types.LOGIN,
        email,
        password
    }
}

const handleLogout = (email, password) => {
    return {
        type: types.LOGOUT,
        email,
        password
    }
}

const  handleRegister =  () => {
    return {
        type: types.REGISTER
    }
}

export const handleLoginRequest = (email, psw) => {
    return (dispatch) => {
        if (!login(email, psw))
            dispatch(handleLogout())
        else {
            login(email, psw).then(res => {
                dispatch(handleLogin(email,psw))
            })
        }
    }

}

export const handleRegisterRequest = (username, email, psw) => {
    return (dispatch) => {
        if (!register(username, email, psw))
            dispatch(handleLogout())
        else {
            register(username, email, psw).then(res => {
                dispatch(handleRegister())
            })
        }
    }

}

export const logOutRequest = () => {
    return (dispatch) => {
        dispatch(handleLogout())
    }
}

export const  handleLockStudent =  id => {
    return {
        type: types.LOCK_STUDENT,
        id
    }
}

export const  handleLockTeacher =  id => {
    return {
        type: types.LOCK_TEACHER,
        id
    }
}

export const  handleDeleteSkill =  id => {
    return {
        type: types.DELETE_SKILL,
        id
    }
}

export const  handleAddSkill =  name => {
    return {
        type: types.ADD_SKILL,
        name
    }
}

export const  handleEditSkill =  (id, value) => {
    return {
        type: types.EDIT_SKILL,
        id,
        value
    }
}

