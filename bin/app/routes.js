'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../controllers/user.js');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../models/user');

var _user4 = _interopRequireDefault(_user3);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var auth = (0, _expressJwt2.default)({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var routes = function () {
    function routes(app) {
        _classCallCheck(this, routes);

        app.get('/api/nerds', function (req, resp) {
            resp.json({ response: "CIAO MONDO" });
        });

        app.post('/api/v1/register', _user2.default.factory().register);
        app.post('/api/v1/login', _user2.default.factory().login);
        app.get('/api/v1/users/profile', auth, _user2.default.factory().getProfile);
    }

    _createClass(routes, null, [{
        key: 'factory',
        value: function factory(app) {
            new routes(app);
        }
    }]);

    return routes;
}();

exports.default = routes;