'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);

    this.instance = null;
  }

  _createClass(UserController, [{
    key: 'register',
    value: function register(req, res) {
      var user = new _user2.default();

      user.name = req.body.name;
      user.email = req.body.email;

      user.setPassword(req.body.password);

      user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token": token
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      _passport2.default.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }

        // If a user is found
        if (user) {
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token": token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
    }
  }, {
    key: 'getProfile',
    value: function getProfile(req, res) {

      if (!req.payload._id) {
        res.status(401).json({
          "message": "UnauthorizedError: private profile"
        });
      } else {

        _user2.default.findById(req.payload._id).exec(function (err, user) {
          res.status(200).json({ email: user.email });
        });
      }
    }
  }], [{
    key: 'factory',
    value: function factory() {
      if (this.instance == null) {
        this.instance = new UserController();
      }
      return this.instance;
    }
  }]);

  return UserController;
}();

exports.default = UserController;