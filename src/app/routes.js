import UserController from '../controllers/user.js';
import User from '../models/user';
import jwt from 'express-jwt';

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

export default class routes {
    
    constructor(app) {
        app.get('/api/nerds', function(req, resp) {
            resp.json({response: "CIAO MONDO"}); 
        
    });
    
    app.post('/api/v1/register', UserController.factory().register);
    app.post('/api/v1/login', UserController.factory().login);
    app.get('/api/v1/users/profile', auth, UserController.factory().getProfile);
   }
    
    static factory(app) {
      new routes(app);  
    }
}