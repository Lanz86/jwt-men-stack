
import mongoose from 'mongoose';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';



class UserModel {
    constructor() {
        
    }
    
    static getSchema() {
        let userSchema = new mongoose.Schema ({
            email: { type: String, unique: true, required: true},
            name: { type: String, required: true },
            hash: String,
            salt: String
        });
      
        userSchema.methods.setPassword = function(password) {
            this.salt = crypto.randomBytes(16).toString('hex');
            this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        };

        userSchema.methods.validPassword = function(password) {
            let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
            return this.hash === hash;
        };

        userSchema.methods.generateJwt = function() {
            let expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);

            return jsonwebtoken.sign({
                _id: this._id,
                email: this.email,
                name: this.name,
                exp: parseInt(expiry.getTime() / 1000),
            }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
        };
        
        return userSchema;
    }   
}

export default mongoose.model('User', UserModel.getSchema());