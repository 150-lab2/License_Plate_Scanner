let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require("mongoose")
let path = require('node:path');
require('dotenv').config();


// Initial Server Setup
/*
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", function() {
  console.log("Connected to database");
});*/

// Setup Schemas
/*
let userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
})

let licenseSchema = mongoose.Schema({
    plate_number: {type: String, required: true},
    expiration: {type: String, required: true}
})*/

// Temporary Schema
let userSchema = mongoose.Schema({
    org: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    license_plate_number: {type: String, required: true},
    user_password: {type: String, required: true}
});


// Log requests to console
app.use('/', (req, res, next) => {
        console.log(req.method + " " + req.path + " - " + req.ip);
        next();
    });

// Set up body-paser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// loads css files and images
app.use('/css', express.static(path.join(__dirname,'..','frontend','css')));
app.use('/images', express.static(path.join(__dirname,'..','frontend','images')));

// GET requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});
app.get('/log_in', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'log_in.html'));
});
app.get('/sign_up', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'sign_up.html'));
});

// POST requests
app.post('/log_in', (req, res) => {
    console.log(req.body);
    res.redirect('log_in');
});

app.post('/sign_up', (req, res) => {
    console.log(req.body);
    res.redirect('/sign_up');
});

// Host locally on port 5000
app.listen(5000, () => {
    console.log('Running on port 5000');
});