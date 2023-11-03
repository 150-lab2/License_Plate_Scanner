let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose')
let path = require('node:path');
const { type } = require('node:os');
require('dotenv').config();


// Initial Server Setup
mongoose.connect(process.env.MONGO_LOCAL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Failed to connect to', err);
    });

// Import mongoose models
const User = require(path.join(__dirname,'src','models','users.js'));

/*
const User = mongoose.model('User', new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    plate_number: String,
    permits: [{
        expiration: Date, 
        org: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
    }]
}));*/


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

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            console.log('Valid User');
            if (user.password == req.body.user_password) {
                console.log('Correct Password');
            } else {
                console.log('Incorrect Password');
            }
            return res.status(200);
        } else {
            console.log('Invalid User');
            return res.status(400);
        }
    });
    res.redirect('log_in');
});
app.post('/sign_up', (req, res) => {
    console.log(req.body);
    
    // Look for existing user
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            console.log('User already exists');
            return res.status(400);
        } else {
            console.log('New User');
            const newUser = new User({
                email: req.body.email
            });
            newUser.save();
            return res.status(200);
        }
    });
    res.redirect('/sign_up');
});

// Host locally on port 5000
app.listen(5000, () => {
    console.log('Running on port 5000');
});