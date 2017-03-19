const express = require('express');
const validateUser = require('../shared/validateUser.js');
const User = require('../models/user.js');

const router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = validateUser(req.body);
    const results = {
        errors: null,
        user: null
    };

    if (!isValid) {
        results.errors = errors;
        return res.status(400).json(results);
    }

    // create a new instance of the user (momgoose)
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // save user into the DB
    newUser.createUser((err, user) => {
        if (err) throw err;
        results.user = user;
        res.status(200).json(results);
    });

});

router.put('/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json(req.body);
    // const { errors, isValid } = validateUser(req.body);
    // const results = {
    //     errors: null,
    //     user: null
    // };
    //
    // if (!isValid) {
    //     results.errors = errors;
    //     return res.status(400).json(results);
    // }
    //
    // // create a new instance of the user (momgoose)
    // const newUser = new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    //
    // // save user into the DB
    // newUser.createUser((err, user) => {
    //     if (err) throw err;
    //     results.user = user;
    //     res.status(200).json(results);
    // })

});

module.exports = router;
