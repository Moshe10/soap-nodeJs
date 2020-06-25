const { getReport } = require('./getter');
const { sortArrayToReports } = require('./functions/getReportsFunction');

class Report {
    constructor(object) {
        this.object = object
    }

    reportSwitch() {
        let data;
        if (this.object['ActionsReportBaseQuery']) {
            data = this.actionsReportBaseQueryFunc();
        }
        else if (this.object['ActionsAndPaymentsReportBaseQuery']) {
            data = this.actionsAndPaymentsReportBaseQuery();
        }
        else if (this.object['PaymentsReportBaseQuery']) {
            data = this.paymentsReportBaseQuery();
        }
        else if (this.object['TransactionManualSucceedReportBaseQuery']) {
            data = this.transactionManualSucceedReportBaseQuery();
        }
        else if (this.object['CardsConcentrationReportBaseQuery']) {
            data = this.cardsConcentrationReportBaseQuery();
        }
        return data;
    }

    async actionsReportBaseQueryFunc() {
        let reportsData;
        let queryData = this.object.ActionsReportBaseQuery
        let params = {
            startDate: queryData.DateStart,
            endDate: queryData.DateEnd,
            phoneNumber: queryData.PhoneNumber !== null ? paramObj.PhoneNumber : '',
            supplier_id: queryData.ProviderID,
        }
        await getReport(params, 0).then(res => {
            if (res.data) {
                reportsData = sortArrayToReports(res.data);
            }
            else {
                reportsData = { ErrorMessage: res };
            }
        });
        return reportsData;
    }

    async actionsAndPaymentsReportBaseQuery() {
        let reportsData;
        let queryData = this.object.ActionsAndPaymentsReportBaseQuery
        let params = {
            startDate: queryData.DateStart,
            endDate: queryData.DateEnd,
        }
        await getReport(params, 2).then(res => {
            if (res.data) {
                reportsData = sortArrayToReports(res.data);
            }
            else {
                reportsData = { ErrorMessage: res };
            }
        });
        return reportsData;
    }

    async paymentsReportBaseQuery() {
        let reportsData;
        let queryData = this.object.PaymentsReportBaseQuery
        let params = {
            startDate: queryData.DateStart,
            endDate: queryData.DateEnd,
        }
        await getReport(params, 1).then(res => {
            if (res.data) {
                reportsData = sortArrayToReports(res.data);
            }
            else {
                reportsData = { ErrorMessage: res };
            }
        });
        return reportsData;
    }

    async transactionManualSucceedReportBaseQuery() {
        let reportsData;
        let queryData = this.object.TransactionManualSucceedReportBaseQuery
        let params = {
            startDate: queryData.DateStart,
            endDate: queryData.DateEnd,
        }
        await getReport(params, 3).then(res => {
            if (res.data) {
                reportsData = sortArrayToReports(res.data);
            }
            else {
                reportsData = { ErrorMessage: res };
            }
        });
        return reportsData;
    }

    async cardsConcentrationReportBaseQuery() {
        console.log('cardsConcentrationReportBaseQuery()...');
        let reportsData;
        let queryData = this.object.CardsConcentrationReportBaseQuery
        let params = {
            startDate: queryData.DateStart,
            endDate: queryData.DateEnd,
        }
        await getReport(params, 4).then(res => {
            if (res.data) {
                console.log(res.data.length);
                reportsData = sortArrayToReports(res.data);
            }
            else {
                reportsData = { ErrorMessage: res };
            }
        });
        return reportsData;
    }
}

module.exports = Report;