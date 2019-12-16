/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'

export const getAllReport = page => {
    return API
        .get(`/report-list/${page}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getNumberReport = () =>{
    return API
        .get(`report-list/number`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}


export const solveReport = (id) => {
    return API
        .post(`/report/solve-report`, {
            id,
        })
        .then(res => {
            return res
        }).catch(error => console.log(error));
}