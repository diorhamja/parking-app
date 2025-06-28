const User = require('../models/users.model');

module.exports.getAllUsers = (request, response) => {
    User.find({})
        .then(users => {
            response.json(users);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    User.findOne({ email })
    .then(user => {
        if (!user) return res.status(401).json({ message: 'User not found' });

        if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ user });
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err }));
};

module.exports.register = (req, res) => {
    const { firstName, lastName, email, password, location } = req.body;

    if (!firstName || !lastName || !email || !password || !location) return res.status(400).json({ message: 'Missing credentials' });

    User.create({ firstName, lastName, email, password, location })
    .then(user => {
        res.json({ user });
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err }));
}

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}