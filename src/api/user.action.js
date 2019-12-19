/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'



export const getAllUserTeacher = page => {
    return API
        .get(`/user-list/teacher/${page}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}


export const getAllUserStudent = page => {
    return API
        .get(`/user-list/student/${page}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getNumberUserTeacher = () =>{
    return API
        .get(`user-list/teacher/number`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getNumberUserStudent = () =>{
    return API
        .get(`user-list/student/number`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}


export const blockUser = id => {
    return API
        .get(`/user/block/${id}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const unblockUser = id => {
    return API
        .get(`/user/unblock/${id}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}



export const getUserDetail = id =>{
    let _id = id;
    if(id.indexOf('/') === -1){
        _id = '/' + id;
    }
    return API
        .get(`/user-detail${_id}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}