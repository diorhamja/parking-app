const SpotController = require('../controllers/spots.controller');

module.exports = (app) => {
    app.get('/api/spots', SpotController.getAllSpots);
    app.get('/api/spots/:id', SpotController.getOneSpot);
    app.post('/api/spots', SpotController.createSpot);
    app.patch('/api/spots/:id', SpotController.updateSpot);
    app.delete('/api/spots/:id', SpotController.deleteSpot);
}