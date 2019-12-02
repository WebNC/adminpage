import * as types from '../constants/index'

const logined = localStorage.getItem("token");

const initialState = {
    isLogin: (logined !== null) && true 
}

const login = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                isLogin: true
            }
        case types.LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isLogin: false
            }
        default:
            return state
    }
}

export default login;

