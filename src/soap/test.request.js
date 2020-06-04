const soap = require('soap');
const util = require('util');

const url = 'http://84.95.87.251:8000/ServicePeletalk.asmx';
async function createSoapClient () {
    const client = await soap.createClientAsync(url, {forceSoap12Headers: true});
    const serviceDescription = client.describe();
    // console.log(JSON.stringify(serviceDescription, null, 4))
    return client;
}

async function load() {
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
    
    const client = await createSoapClient();
    
    const loadFunctionPromise = util.promisify(client.Load);
    return loadFunctionPromise({LoadQuery});
}


load()
    .then(
    (result) => {
        console.log(result.LoadFunctionResult);
    })
    .catch(error => (console.warn('Error', error)))


async function addFunction(a, b) {
    const client = await createSoapClient();
    return new Promise(
        (resolve, reject) =>
    {
        client.SumOfTwoInt({intA: a, intB: b},
            (error, result) =>
            {
                if(error) reject(error);
                resolve(result);
        });
    });
}

// addFunction(15,38).then(console.log).catch(console.log);




