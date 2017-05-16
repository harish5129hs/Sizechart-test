var express  = require('express');
var path = require('path');
var router = express.Router();

router.get('/index',function(req, res) {
    res.sendFile('index.html',{ root: path.join(__dirname, '../public/') });
});

module.exports=router;