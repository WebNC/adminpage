/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'

export const getAllTopTeacherIncomeAll = () => {
    return API
        .get(`/top-teacher-income-list/all`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getAllTopTeacherIncome = (type,date) => {
    return API
        .post(`/top-teacher-income-list/${type}`,{date})
        .then(res => {
            return res
        }).catch(error => console.log(error));
}
export const getAllTopSkillIncomeAll = () => {
    return API
        .get(`/top-skill-income-list/all`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}
export const getAllTopSkillIncome = (type,date) => {
    return API
        .post(`/top-skill-income-list/${type}`,{date})
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

