const axios = require('axios');

const SERVER_BASE = 'http://vpnj.ravtech.co.il:8080/api/v1';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const data = 'peletok0:pass0';
    config.headers.Authorization = data;
    return config;
});

function dataGetter(url) {
    return new Promise(function (resolve, reject) {
        axios.get(SERVER_BASE + url).then(
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
    return dataGetter('/user/user_details');
}

function getSellerProviders() {
    return dataGetter('/supplier?filter=true');
}

function getProductsByProvider(providerId) {
    return dataGetter(`/product/products/${providerId}?filter=true`);
}

function getReport(params, type) {
    return dataGetter(`/report/report_data/${type}/${appendParams(params)}`);
}

function getMunicipality() {
    return dataGetter('/city_pay');
}

module.exports = {
    getObligo: getObligo,
    getSellerProviders: getSellerProviders,
    getProductsByProvider: getProductsByProvider,
    getReport: getReport,
    getMunicipality: getMunicipality
}
