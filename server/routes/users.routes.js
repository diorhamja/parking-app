const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getOneUser);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users', UserController.createUser);
    app.patch('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
}