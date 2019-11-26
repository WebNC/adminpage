import API from './axios.config'

export const register = (username, password, email, phone) => {
    return API
        .post(`/users/register`, {
            username,
            password,
            email,
            phone
        })
        .then(res => {
            return res;
        }).catch(res => {
            console.log(res);
        }
        )
}


export const login = (phone, password) => {
    return API
        .post(`/users/login`, {
            phone,
            password,
        })
        .then(res => {
            return res
        }).catch(res => {
            console.log(res);
        }
        )
}


export const getUser = () => {
    return API
        .get(`/users/me`)
        .then(res => {
            // to do
        }).catch(error => console.log(error));
}


export const updateProfile = (user) => {
    return API
        .post(`/users/me`, {
            user,
            type: 0
        })
        .then(res => {
           // to do
        }).catch(res => {
            console.log(res)
        }
        )
}

export const updatePassword = (user) => {
    return API
        .post(`/users/me`, {
            user,
            type: 1
        })
        .then(res => {
            // todo 
        }).catch(res => {
            console.log(res)
        }
        )
}


export const updateAvatar = (user) => {
    return API
        .post(`/users/me`, {
            user,
            type: 2
        })
        .then(res => {
            // todo
        }).catch(res => {
            console.log(res)
        }
        )
}


