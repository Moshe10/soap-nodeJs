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

function getObligo() {
    return dataGetter('/user/user_details/');
}

module.exports = {
    getObligo: getObligo
}
