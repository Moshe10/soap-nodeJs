const { Manual, Virtual } = require('../strings');
const VIRTUAL_TYPE = 1;
const MANUAL_TYPE = 2;

function productArr(res, myEnum) {
    let arr = [];
    let obj = res[myEnum.toLowerCase()];
    obj.map(product => {
        let currentProduct = {
            Id: product.id,
            ProductName: product.name,
            Picture: product.image,
            Price: product.price,
            MaxPrice: product.max_payment,
            Description: product.description,
            CardType: product.type == VIRTUAL_TYPE ? Virtual : product.type == MANUAL_TYPE ? Manual : null
        }
        arr.push(currentProduct);
    });
    return arr;
}

module.exports = {
    productArr: productArr
}