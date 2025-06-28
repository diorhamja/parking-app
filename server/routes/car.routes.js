const CarController = require('../controllers/cars.controller');

module.exports = (app) => {
    app.get('/api/cars', CarController.getAllCars);
    app.get('/api/cars/:id', CarController.getOneCar);
    app.get('/api/cars/user/:userId', CarController.getCarByUser);
    app.post('/api/cars/', CarController.createCar);
    app.patch('/api/cars/:id', CarController.updateCar);
    app.delete('/api/cars/:id', CarController.deleteCar);
}