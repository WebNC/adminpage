import * as types from '../constants/index'

const logined = localStorage.getItem("token");

const initialState = {
    isLogin: (logined !== null) && true ,
    username: '',
    age: '',
    address : '',
    phone: '',
    
}

const login = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN:
            if(action.email === 'admin2@mail.com'){
                localStorage.setItem("admin", true);
            }

            localStorage.setItem("token", action.user.token);
            return {
                ...state,
                username: action.user.username,
                isLogin: true,
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

