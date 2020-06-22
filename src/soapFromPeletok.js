const soap = require('soap');
const express = require('express');

const app = express();

const { postLoad } = require('./poster');
const {
  getObligo,
  getSellerProviders,
  getProductsByProvider
} = require('./getter');
const {
  Manual,
  Virtual,
  Frame,
  TemporaryFrame,
  Balance
} = require('./strings');
const { sellerProviderArr } = require('./functions/getSellerFunction');
const { productArr } = require('./functions/getProductsFunction');

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
      async Load(args) {
        let resObj;
        if (args.loadQuery.Load.CardType == Manual) {
          let data = {
            itemId: args.loadQuery.Load.ProductID,
            providerID: args.loadQuery.Load.ProviderID
          }
          await postLoad(data).then(res => {
            resObj = {
              IsSucceeded: true,
              TransactionID: res.currentTransaction,
            }
          });
          return resObj;
        }
        else if (args.loadQuery.Load.CardType == Virtual) {
          let data = {
            contractNumber: args.loadQuery.Load.CellularNumber,
            itemId: args.loadQuery.Load.ProductID,
            phoneNumber: args.loadQuery.Load.CellularNumber,
            providerID: args.loadQuery.Load.ProviderID
          }
          await postLoad(data).then(res => {
            resObj = {
              IsSucceeded: true,
              TransactionID: res.currentTransaction,
            };
          });
          return resObj;
        }
      },
      async GetObligo() {
        let resObj;
        await getObligo().then(res => {
          resObj = {
            Frame: res.balance.filter(item => item.strRepr == Frame),
            TemporaryFrame: res.balance.filter(item => item.strRepr == TemporaryFrame),
            Balance: res.balance.filter(item => item.strRepr == Balance)
          }
        });
        return resObj;
      },
      async GetSellerProviders() {
        let resObj;
        await getSellerProviders().then(res => {
          resObj = sellerProviderArr(res);
        });
        return resObj;
      },
      async GetProducts(args) {
        let resObj;
        await getProductsByProvider(args.query.ProviderID).then( res => {
          resObj = productArr(res, args.query.CardType);
        });
        return resObj;
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