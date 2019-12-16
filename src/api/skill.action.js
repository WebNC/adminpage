/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'


export const getSkill = (page) => {
    return API
        .get(`/skill-list/read/${page}`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const getNumberSkill = () => {
    return API
        .get(`/skill-list/number`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const editSkill = (id, value) => {
    return API
        .post(`/skill-list/update`,{id, value})
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const addSkill = (value) => {
    return API
        .post(`/skill-list/create`,{value   })
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const deleteSkill = (id) => {
    return API
        .post(`/skill-list/delete`,{id})
        .then(res => {
            return res
        }).catch(error => console.log(error));
}
