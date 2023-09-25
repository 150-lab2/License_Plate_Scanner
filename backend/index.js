let express = require('express');
let app = express();
let path = require('node:path');


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'..','frontend','index.html'));
});

// loads entire contents from frontend
app.use('/', express.static(path.join(__dirname,'..','frontend')));

// GET response for each page
/*
app.get('/log_in', function (req, res) {
    res.sendFile(path.join(__dirname,'..','frontend','log_in.html'));
});
app.get('/sign_up', function (req, res) {;
    res.sendFile(path.join(__dirname,'..','frontend','sign_up.html'));
});
app.use('/css', express.static(path.join(__dirname,'..','frontend','css')));
app.use('/images', express.static(path.join(__dirname,'..','frontend','images')));
*/

// hosts locally on port 5000
app.listen(5000, function () {
    console.log('Running on port 5000');
});