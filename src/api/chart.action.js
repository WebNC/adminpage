/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import API from './axios.config'

export const getIncomeData = () => {
    return API
        .get(`/chart/income-data/month`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}