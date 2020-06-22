function sellerProviderArr(res) {
    let arr = [];
    for (let key in res) {
        let obj = res[key];
        obj.map(seller => {
            let currentSeller = {
                ProviderID: seller.id,
                Name: seller.name,
                Icon: seller.image
            }
            arr.push(currentSeller);
        });
    }
    return arr;
}

module.exports = {
    sellerProviderArr: sellerProviderArr
}