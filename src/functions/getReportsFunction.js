function sortArrayToReports(array) {
    if (array.length > 0) {
        let reportsArr = [];
        array.map(item => {
            let currentReport = {};
            for (let key in item) {
                let value = item[key];
                let firstCharUpper = key.charAt(0).toUpperCase() + key.slice(1);
                currentReport[firstCharUpper] = value;
            }
            reportsArr.push(currentReport);
        });
        return reportsArr;
    }
}

module.exports = {
    sortArrayToReports: sortArrayToReports
}