var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var indexRoute = require('./routes/index.js')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',indexRoute);

//handle api responses
app.use('/api/v1', require('./api')());

app.listen(3000);
console.log('Listening on port 3000!');