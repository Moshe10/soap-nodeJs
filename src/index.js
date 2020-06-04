const express = require('express');
const testRouter = require('./routes/test.route');


const app = express();

app.use('/tests', testRouter);

app.listen(3000, () => {
    console.log(`Listening port 3000`);
});
