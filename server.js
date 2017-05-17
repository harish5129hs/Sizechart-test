var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var indexRoute = require('./routes/index.js');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',indexRoute);

//handle api responses
app.use('/api/v1', require('./api')());

server_port =  process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
server_ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});