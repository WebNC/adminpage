/* eslint-disable no-console */
/* eslint-disable prefer-template */
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
            if(res.data){
                const {token} = res.data;
                // localStorage.setItem("token", token);
            }
            return res;
        }).catch(res => {
            console.log(res);
        }
        )
}

export const login = (email, password) => {
    console.log(email, password)
    return API
        .post(`/users/login`, {
            email,
            password,
        })
        .then(res => {
            // if(res.data){
            //     // const { user } = res.data;
            //     // localStorage.setItem("token", user.token);
            // }
            return res
        }).catch(res => {
            console.log(res);
        }
    )
}


export const getUser = () => {
    return API
        .get(`/users/me`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}


export const updateProfile = (id, username, address, age, phone) => {
    return API
        .post(`/edit`, {
            id, username, address, age, phone
        })
        .then(res => {
           return res
        }).catch(res => {
            console.log(res)
        }
        )
}

export const updatePassword = (id, password) => {
    return API
        .post(`/change-pass`, {
            id,
            password
        })
        .then(res => {
            return res
        }).catch(res => {
            console.log(res)
        }
        )
}


export const updateAvatar = ({id, file}) => {

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('id', id);
    
    const config = {
        'headers': { 
        'content-type': 'multipart/form-data'
        }
    }

    return API
        .post(`/upload/avatar`, 
           formData, config
        )
        .then(res => {
            return res
        }).catch(res => {
            console.log(res)
        }
        )
}


