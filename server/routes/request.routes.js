const RequestController = require('../controllers/requests.controller');

module.exports = (app) => {
    app.get('/api/requests', RequestController.getAllRequests);
    app.get('/api/requests/spot/:spotId', RequestController.getAllRequestsBySpotId);
    app.get('/api/requests/:id', RequestController.getOneRequest);
    app.post('/api/requests', RequestController.createRequest);
    app.patch('/api/requests/:id', RequestController.updateRequest);
    app.patch('/api/requests/accept/:requestId', RequestController.acceptRequest);
    app.delete('/api/requests/:id', RequestController.deleteRequest);
}