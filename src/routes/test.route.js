const express = require('express');
const TestController = require('../controllers/test.controller');

const testRouter = express.Router();

testRouter.post('/', TestController.root)

module.exports = testRouter;
