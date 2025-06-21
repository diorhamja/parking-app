const Car = require('../models/car.model');

module.exports.getAllCars = (request, response) => {
    Car.find({})
    .populate('user')
        .then(cars => {
            response.json({cars});
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneCar = (request, response) => {
    Car.findOne({ _id: request.params.id })
        .populate('user')
        .then(car => response.json({car}))
        .catch(err => response.json(err))
}

module.exports.createCar = (request, response) => {
    Car.create(request.body)
        .then(car => response.json({car}))
        .catch(err => response.json(err))
}

module.exports.updateCar = (request, response) => {
    Car.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedCar => response.json({updatedCar}))
        .catch(err => response.json(err))
}

module.exports.deleteCar = (request, response) => {
    Car.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}