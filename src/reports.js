const { getReportBase } = require('./getter')

class Report {
    constructor(object) {
        this.object = object
    }

    reportSwitch() {
        console.log(this.object);
        if (this.object['ActionsReportBaseQuery']) {
            this.actionsReportBaseQueryFunc();
        }
    }

    async actionsReportBaseQueryFunc() {
        console.log('actionsReportBaseQueryFunc()...');
        await getReportBase(this.object.ActionsReportBaseQuery).then(res => {
            console.log('res, ', res.data.length);

        });
    }

}

module.exports = Report;