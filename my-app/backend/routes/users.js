const router = require('express').Router(); // a route we are creating
let User = require('../models/user.model'); // requiring the mongoose model I created

// first point that handles http request
router.route('/').get((req, res) => {
    User.find() // mongoose method that gets a list of all users in mongoDB
        .then(users => res.json(users)) // returning users in json format
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const newUser = new User({
        username,
        password,
        email,
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // have to do for ALL routers