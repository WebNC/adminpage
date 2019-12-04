import * as types from '../constants/index'

const logined = localStorage.getItem("token");

const initialState = {
    isLogin: (logined !== null) && true 
}

const login = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN:
            if(action.email === 'admin@mail.com'){
                localStorage.setItem("admin", true);
            }
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

