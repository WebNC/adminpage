/* eslint-disable no-console */
/* eslint-disable prefer-template */
import API from './axios.config'

export const getAllContract = (page, pageSize, filters, sorter) => {
    return API
        .post(`/contract-list/list`,{page, pageSize,filters,sorter})
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

