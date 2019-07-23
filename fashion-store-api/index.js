var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

var app = express();

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Authorization, access_token, TS, Content-type, Accept, X-Access-Token, X-Key');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(logger('dev'));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.get('/api/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    resHandler(res, 404, false, "Request Not Found", null);
});

var server = app.listen(9090);

console.log('Server running on port : 9090');
