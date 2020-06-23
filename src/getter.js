const axios = require('axios');

const SERVER_BASE = 'http://vpnj.ravtech.co.il:8080/api/v1';


function dataGetter(url) {
    return new Promise(function (resolve, reject) {
        axios.get(SERVER_BASE + url + '?peletok0/?pass0').then(
            function (response) {
                resolve(response.data);
            }
        ).catch(
            function (error) {
                // TODO - add real error handling
                reject(error);
            }
        );
    });
}

function appendParams(params) {
    return Object.keys(params).reduce((n, k) => `${n}${n == '?' ? '' : '&'}${k + '=' + params[k]}`, '?');
}

/*
 * ########################################
 *       ONLY WRITE BELLOW THIS LINE       
 * ########################################
 */

function getObligo() {
    return dataGetter('/user/user_details/');
}

function getSellerProviders() {
    return dataGetter('/supplier?filter=true/');
}

function getProductsByProvider(providerId) {
    return dataGetter(`/product/products/${providerId}?filter=true/`);
}

function getReportBase(paramObj) {
    // &phoneNumber=0551465465&startDate=2020-06-01&startDateTime=00:00&endDate=2020-06-23&endDateTime=23:59&supplier_id=94
    console.log('getReportBase()...');
    let params = {
        DateStart: paramObj.DateStart,
        DateEnd: paramObj.DateEnd,
        PhoneNumber: paramObj.PhoneNumber,
        ProviderID: paramObj.ProviderID,
    }
    return dataGetter(`/report/report_data/0/${appendParams(params)}/`);
}

module.exports = {
    getObligo: getObligo,
    getSellerProviders: getSellerProviders,
    getProductsByProvider: getProductsByProvider,
    getReportBase: getReportBase
}
