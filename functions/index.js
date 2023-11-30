const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(express.json());

// Databases
//const MONGO_LOCAL = 'mongodb://127.0.0.1:27017/PlateMate';
//MONGO_URI = process.env.MONGO_URI;

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log('ERROR: ' + err));

// Import database models
const { User } = require('./src/models/user');
const { Plate } = require('./src/models/plate');
const { Permit } = require('./src/models/permit');
const { Org } = require('./src/models/org')

// APIs
// Send all requests to the following urls
// Local: http://127.0.0.1:5001/platemate-7ddf8/us-central1/api
// Online: https://api-uhjbtekcgq-uc.a.run.app
// Data should be sent as form data


// Used for getting data for user
// Request should include user email (email) and password (password)
// Will send json contain of of user's data
app.get('/get_user', (req, res) => {
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
                    select: '-_id'
                }
            }
        })
        .select('-_id -__v')
        .then((doc) => {
            if (doc == null) {
                res.status(401).send({ msg: 'User does not exist' });
            } else if (req.body.password != doc.password) {
                res.status(401).send({ msg: 'Incorrect Password' });
            } else {
                res.status(200).send(doc);
            }
        })
        .catch((err) => res.status(400).send({ msg: 'ERROR: ' + err}));
});

// Used for creating a new user
// Request should include user's name (first_name, last_name), email (email), and password (password)
// Will create a new entry in database and send back json with message
app.post('/create_user', (req, res) => {
    User.create({
        name: { first: req.body.first_name, 
                last: req.body.last_name },
        email: req.body.email,
        password: req.body.password
    })
        .then(() => res.status(200).send({ msg: 'New User Created' }))
        .catch((err) => res.status(400).send({ msg: 'ERROR: ' + err }));
});

// Used for checking if a license plate has a valid permit
// Request should include enforcer org (org) and license plate number (number)
// Will send json with message stating whether the license plate is vaild or not
app.get('/verify_plate', (req, res) => {
    Plate.findOne({ number: req.body.number })
        .populate({
            path: 'permits',
            model: 'Permit',
            strictPopulate: false,
            populate: {
                path: 'org',
                model: 'Org',
                strictPopulate: false,
            }
        })
        .then((doc) => {
            if(doc == null) {
                res.status(401).send({ msg: 'Plate does not exist'});
            } else {
                for (let permit of doc.toObject().permits) {
                    if (permit.org.name == req.body.org) {
                        let currDate = Date.now()
                        if (currDate > permit.range.start && currDate < permit.range.end) {
                            res.status(200).send({ msg: 'Vaild Permit' });
                            return;
                        }
                        res.status(401).send({ msg: 'Invaild Permit' });
                    }
                }
                res.status(401).send({ msg: 'Invalid Permit (No permit for this organization)'});
            }
        })
        .catch((err) => res.status(400).send({ msg: 'ERROR: ' + err}));
});

// Used for seeing all available permits
// No data needed
// Will return array will all currently available permits
// Permit ids are included to facilitate adding permits to license plates
app.get('/get_permits', (req, res) => {
    Permit.find()
        .populate('org', '-_id')
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => res.status(400).send({ msg: 'ERROR: ' + err }));
});

// Used for assigning permits to a license plates
// Request should include license plate number (number) and permit id (permit_id)
// Will append id of the permit to plate's list of permits and update the database
app.put('/assign_permit', (req, res) => {
    Plate.findOne({ number: req.body.number })
        .then((doc) => {
            for (let permit of doc.permits) {
                if (permit == req.body.permit_id) {
                    res.status(401).send({ msg: 'Permit Already Owned' });
                    return;
                }
            }
            doc.permits.push(req.body.permit_id);
            doc.save();
            res.send(doc);
        })
        .catch((err) => res.status(400).send({ msg: 'ERROR: ' + err }));
});

exports.api = onRequest(app);