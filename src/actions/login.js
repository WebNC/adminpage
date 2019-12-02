import * as types from '../constants/index';

export const handleLogin = (email, password) => {
    return {
        type: types.LOGIN,
        email,
        password
    }
}

export const handleLogout = () => {
    return {
        type: types.LOGOUT
    }
}


