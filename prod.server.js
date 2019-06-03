var express = require('express');
var config = require('./config/index');

var opn = require('opn')

var port = 9000

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
    req.url = '/index.html';
    next();
})

app.use(router);


app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + 9000
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
