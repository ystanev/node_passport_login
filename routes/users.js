const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !emaiol || !password || !password2) {
        errors.push({
            msg: 'Please fill in all fields.'
        });
    }

    //Check passwords match 
    if (password !== password2) {
        errors.push({
            msg: 'Passwords do not match.'
        });
    }

    if (password.length < 6) {
        errors.push({
            msg: 'Password should be at least 6 characters.'
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        const newUser = new newUser({
            name,
            email,
            password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                //Set password to hashed
                newUser.password = hash;
                //Save the user
                newUser.save()
                    .then(user => {
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
            }))
    }

});

module.exports = router;