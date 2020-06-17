const soap = require('soap');
const express = require('express');
const axios = require('axios');

const app = express();
const peletokTestServerURL = 'http://vpnj.ravtech.co.il:8080/api/v1/';
const testPaymentPath = 'payment/payment/94';
const testGetDetails = 'user/user_details/?peletok0/?pass0';
/**
 * this is remote service defined in this file, that can be accessed by clients, who will supply args
 * response is returned to the calling client
 * our service calculates bmi by dividing weight in kilograms by square of height in metres
 */
const service = {
  ServicePeleTalk: {
    ServicePeleTalkSoap: {
      GetReport(args) {
        console.log('GetReport args, ', args);
        return { data: 'GetReport success' };
      },
      Load(args) {
        let data = {
          apiName: 'node_api_soap',
          username: 'peletok0',
          password: 'pass0',
          itemId: args.loadQuery.Load.ProductID
        }
        console.log('data, ', data);
        axios.post(`${peletokTestServerURL}${testPaymentPath}`, data).then( res => {
          console.log('res, ', res.data);
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.log('err.response.data.error, ', err.response.data.error);
          }
        });
        return { data: 'Load success' };
      },
      async GetObligo(args) {
        console.log('GetObligo args, ', args);
        await axios.get(`${peletokTestServerURL}${testGetDetails}`).then( res => {
          console.log('res, ', res.data);
        }).catch(err => {
          if (err && err.response && err.response.data) {
            console.log(err.response.data.error);
          }
        });
        return { data: 'GetObligo success' };
      }
    }
  }
};
// xml data is extracted from wsdl file created
const xml = require('fs').readFileSync('./peletokTest.wsdl', 'utf8');
//create an express server and pass it to a soap server
const server = app.listen(3030, function () {
  const host = '127.0.0.1';
  const port = server.address().port;
});
soap.listen(server, '/peletok', service, xml);