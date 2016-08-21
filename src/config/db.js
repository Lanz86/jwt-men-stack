// config/db.js

export default class db {
    constructor() {

    }
    //MongoDB Connection
    static getUrl() {
        return 'mongodb://localhost:27017/menstack';
    }
}