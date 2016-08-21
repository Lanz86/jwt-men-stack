import passport from 'passport';
import mongoose from 'mongoose';

import User from '../models/user';

export default class UserController {
    
    constructor() {
      this.instance = null;
    }
  
    static factory() {
      if(this.instance == null) {
        this.instance = new UserController();
      }
      return this.instance;
    }
    
    register(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save(function(err) {
          var token;
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        });
    }

    login (req, res) {
        passport.authenticate('local', function(err, user, info){
          var token;
          
          // If Passport throws/catches an error
          if (err) {
            res.status(404).json(err);
            return;
          }

          // If a user is found
          if(user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
              "token" : token
            });
          } else {
            // If user is not found
            res.status(401).json(info);
          }
        })(req, res);

    }
    
    getProfile (req, res) {

      if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
      } else {
          
        User
          .findById(req.payload._id)
          .exec(function(err, user) {
            res.status(200).json({ email: user.email });
          });
      }
    }

}