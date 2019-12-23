/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import API from './axios.config'

export const getIncomeDataAll = () => {
    return API
        .get(`/chart/income-data/year`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const getIncomeData = (type, date) => {
    return API
        .post(`/chart/income-data/${type}`,{date})
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}