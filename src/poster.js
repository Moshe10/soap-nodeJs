const axios = require('axios');

const SERVER_BASE = 'http://vpnj.ravtech.co.il:8080/api/v1';


function dataPoster(url, sentData = {}) {
    sentData.username = 'peletok0';
    sentData.password = 'pass0';
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

module.exports = {
    postLoad: postLoad
}