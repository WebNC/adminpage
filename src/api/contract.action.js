/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'

export const getAllContract = page => {
    return API
        .get(`/contract-list/${page}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const getNumberContract = () =>{
    return API
        .get(`contract-list/number`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

