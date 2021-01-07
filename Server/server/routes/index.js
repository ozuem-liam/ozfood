const usersController = require('../controllers/users');


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the ozfoods API',
    }));

    app.post('/api/v1/signup', usersController.create);
};