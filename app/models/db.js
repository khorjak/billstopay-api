// app/models/db

const dbName = './db/billstopay.db';
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor() {
        this.dbName = dbName;
    }

    query(queryString, params, callback) {
        this.connection = new sqlite3.Database(this.dbName, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error('query get conn: ' + err.message);
                callback(err);
            }
        });

        let result = [];
        if (params === undefined || params === null || !params) {
            this.connection.each(queryString, (err, row) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                }
                result.push(row);
            });
        } 
        else {
            this.connection.get(queryString, params, (err, row) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                }
                if (!row) {
                    console.error('no record found');
                    callback({'error':'No record found'});
                }
                result.push(row);
            });
        }
        
        this.connection.close((err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            console.log('Close the database connection.');
            callback(null, result);
        });
    }

    insert(queryString, params, callback) {
        this.connection = new sqlite3.Database(this.dbName, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error('insert get conn: ' + err.message);
                callback(err);
            }
        });

        let result = '';
        this.connection.run(queryString, params, (err) => {
            if (err) {
                callback(err);
            }
            else {
                result = `Row inserted ${this.lastID}`;
            }
        });

        this.connection.close((err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            console.log('Close the database connection.');
            callback(null, result);
        });
    }

    delete(queryString, params, callback) {
        this.connection = new sqlite3.Database(this.dbName, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error('delete get conn: ' + err.message);
                callback(err);
            }
        });

        let result = '';
        this.connection.run(queryString, params, (err) => {
            if (err) {
                callback(err);
            }
            else {
                result = `Row(s) deleted ${this.changes}`;
            }
        });

        this.connection.close((err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            console.log('Close the database connection.');
            callback(null, result);
        });
    }
}

module.exports = Db;