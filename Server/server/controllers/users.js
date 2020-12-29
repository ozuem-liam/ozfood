let User = require('../models').User;

module.exports = {
    create(req, res) {
        return User
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            emailaddress: req.body.emailaddress,
            password: req.body.password,
        })
        
        .then(User => res.status(201).send(User))
        .catch(error => res.status(400).send(error));
    },
};