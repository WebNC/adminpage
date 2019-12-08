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

export const  handleLockStudent =  username => {
    return {
        type: types.LOCK_STUDENT,
        username
    }
}

export const  handleLockTeacher =  username => {
    return {
        type: types.LOCK_TEACHER,
        username
    }
}

export const  handleDeleteSkill =  name => {
    return {
        type: types.DELETE_SKILL,
        name
    }
}

export const  addSkill =  name => {
    return {
        type: types.ADD_SKILL,
        name
    }
}

