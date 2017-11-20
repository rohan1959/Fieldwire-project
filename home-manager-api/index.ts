let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser')



mongoose.connect('mongodb://ds259865.mlab.com:59865/home-manager-db', {
    user: 'homemanager',
    pass: 'homemanager@123'
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require('./project.ts'));

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

let server = app.listen(process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});

