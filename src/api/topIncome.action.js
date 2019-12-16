/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'

export const getAllTopTeacherIncome = (type) => {
    return API
        .get(`/top-teacher-income-list/${type}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getAllTopSkillIncome = (type) => {
    return API
        .get(`/top-skill-income-list/${type}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

