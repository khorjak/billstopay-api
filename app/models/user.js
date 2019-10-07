// app/models/user

const Db = require('./db');

class User {
    constructor(email, password) {
        this.id = 0;
        this.email = email;
        this.password = password;
    }

    find(callback) {
        getUser(this.email, this.password, callback);    
    }
}

function getUser(email, password, callback) {
    var db = new Db();
    db.query('SELECT * FROM users WHERE email=? AND password=?;', [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err);
        }
        if (!row) {
            console.error('no user found');
            callback({'error':'No user found'});
        }
        callback(null, row);
    });
}

module.exports = User;