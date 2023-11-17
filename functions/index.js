const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
app.use(express.json());

// Databases
MONGO_LOCAL = 'mongodb://127.0.0.1:27017/PlateMate';
MONGO_ONLINE = 'mongodb+srv://e-pimentel:W2XR74ZsFL8HfyMf@platemate.kw9tqvp.mongodb.net/plate-mate?retryWrites=true&w=majority';

// Connect to database
mongoose.connect(MONGO_ONLINE);

// Import database models
const { User } = require('./src/models/user');
const { Plate } = require('./src/models/plate');
const { Permit } = require('./src/models/permit');
const { Org } = require('./src/models/org')

// User API
app.get('/user', (req, res) => {
    User.findOne({ email: req.body.email })
        .populate({
            path: 'plates',
            select: '-_id',
            model: 'Plate',
            populate: {
                path: 'permits',
                model: 'Permit',
                strictPopulate: false,
                select: '-_id',
                populate: {
                    path: 'org',
                    model: 'Org',
                    strictPopulate: false,
                    select: '-_id',
                }
            },
        })
        .select('-_id -__v')
        .then((doc) => {
            if (doc == null) {
                res.status(200).send('User does not exist');
            } else {
                res.status(200).json(doc);
            }
        })
        .catch((err) => res.status(400).send('ERROR: ' + err));
});
app.post('/user', (req, res) => {
    User.create({
        name: { first: req.body.first_name, 
                last: req.body.last_name },
        email: req.body.email,
        password: req.body.password
    })
        .then(() => res.status(200).send("New User Created"))
        .catch((err) => res.status(400).send('ERROR: ' + err));
});

exports.api = onRequest(app);