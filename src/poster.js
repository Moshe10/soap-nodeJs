const axios = require('axios');

const SERVER_BASE = 'http://vpnj.ravtech.co.il:8080/api/v1';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const data = 'peletok0:pass0';
    config.headers.Authorization = data;
    return config;
});

function dataPoster(url, sentData = {}) {
    return new Promise(function (resolve, reject) {
        axios.post(SERVER_BASE + url, sentData).then(
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


function postLoad(data) {
    return dataPoster('/payment/payment/' + data.providerID, data);
}

function postMunicipalityDept(data) {
    return dataPoster('', data);
}

module.exports = {
    postLoad: postLoad
}