'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserModel = function () {
    function UserModel() {
        _classCallCheck(this, UserModel);
    }

    _createClass(UserModel, null, [{
        key: 'getSchema',
        value: function getSchema() {
            var userSchema = new _mongoose2.default.Schema({
                email: { type: String, unique: true, required: true },
                name: { type: String, required: true },
                hash: String,
                salt: String
            });

            userSchema.methods.setPassword = function (password) {
                this.salt = _crypto2.default.randomBytes(16).toString('hex');
                this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
            };

            userSchema.methods.validPassword = function (password) {
                var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
                return this.hash === hash;
            };

            userSchema.methods.generateJwt = function () {
                var expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);

                return _jsonwebtoken2.default.sign({
                    _id: this._id,
                    email: this.email,
                    name: this.name,
                    exp: parseInt(expiry.getTime() / 1000)
                }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
            };

            return userSchema;
        }
    }]);

    return UserModel;
}();

exports.default = _mongoose2.default.model('User', UserModel.getSchema());