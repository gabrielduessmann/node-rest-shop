const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// encryption
const bcrypt = require("bcrypt");

const User = require('../models/user');

// Sign up
router.post('/signup', (req, res, next) => {
    User.find({
        email: req.body.email 
    })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "E-mail already exists"
            });
        } else {

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: "User created"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                } 
            });
        }
    })
});

router.post("/login", (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length<1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if (err) {
                return res.status(404).json({
                    message: "Auth failed."
                });
            }
            if (result) {
                return res.status(200).json({
                    message: "Auth successful"
                });
            } else {
                return res.status(404).json({
                    message: "Auth failed."
                });
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.params.userId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;