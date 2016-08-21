'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _routes = require('./app/routes');

var _routes2 = _interopRequireDefault(_routes);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configuration

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
_mongoose2.default.connect(_db2.default.getUrl());

//config files  

// modules
var app = (0, _express2.default)();

//set out port
var port = process.env.PORT || 3004;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(_bodyParser2.default.json());
// parse application/vnd.api+json as json
app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use((0, _methodOverride2.default)('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(_express2.default.static(__dirname + '/public'));
//app.use(passport.initialize());
app.use((0, _morgan2.default)('dev'));

// routes ==================================================
_routes2.default.factory(app);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});