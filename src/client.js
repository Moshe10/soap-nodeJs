const express = require('express');
const soap = require('soap');
const url = 'http://localhost:3030/peletok?wsdl';
const LoadQuery = {
  ConnectionOrDeviceID: '356',
  Language: 'Hebrew',
  Branch: 'Betar Illit',
  UserName: 'Yitzhak',
  AgentId: '222',
  AgentName: 'Yitzhak Galitch',
  CardType: 'Manual',
  Load: {
    TerminalNum: '333',
    ProviderID: 128,
    ProductID: 34,
    CellularNumber: '0584411505',
    Payment: 35.50
  }
};
soap.createClient(url, function (err, client) {
  if (err) console.error(err);
  else {
    client.Load(LoadQuery, function (err, response) {
      if (err) console.error(err);
      else {
        console.log(response);
        // res.send(response);
      }
    });
  }
});