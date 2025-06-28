const Car = require('../models/car.model');
const { generateCarImage } = require('../utils/generateCarImage');

module.exports.getAllCars = (request, response) => {
    Car.find({})
    .populate('user')
        .then(cars => {
            response.json(cars);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneCar = (request, response) => {
    Car.findOne({ _id: request.params.id })
        .populate('user')
        .then(car => response.json(car))
        .catch(err => response.json(err))
}

module.exports.getCarByUser = (request, response) => {
    const userId = request.params.userId;

    Car.findOne({ user: userId })
        .populate('user')
        .then(car => {
            response.json(car);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.createCar = async (request, response) => {

    const { userId, make, model, color, plate} = request.body;

    try {
        const imageUrl = await generateCarImage(make, model, color);

        const car = await Car.create({
            user: userId,
            make,
            model,
            color,
            plate,
            image: imageUrl,
        });

        response.status(201).json(car);
    } catch (err) {
        console.error('Car image generation failed:', err.message);
        response.status(500).json({ error: 'Car registration failed' });
    }
}

module.exports.updateCar = async (request, response) => {
    const { make, model, color, plate } = request.body;

    try {
        const imageUrl = await generateCarImage(make, model, color);

        const updatedCar = await Car.findByIdAndUpdate(
        request.params.id,
        {
            make,
            model,
            color,
            plate,
            image: imageUrl,
        },
        { new: true, runValidators: true }
        );

        if (!updatedCar) {
        return response.status(404).json({ error: 'Car not found' });
        }

        response.status(200).json(updatedCar);
    } catch (err) {
        console.error('Car image generation or update failed:', err.message);
        response.status(500).json({ error: 'Car update failed' });
    }
};

module.exports.deleteCar = (request, response) => {
    Car.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}