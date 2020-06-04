class TestController {
    static root(request, response) {
        console.log('get in too TestController.root');
        console.log(request);
   
        response.status(200);
        response.json({ requestStatus: 'success' });
    }
}

module.exports = TestController;