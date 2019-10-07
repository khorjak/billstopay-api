// app/models/transaction

const Db = require('./db');

class Transaction {
    constructor(
        payee,
        payamount,
        paydate,
        memo,
        fk_users
    ) {
        this.id = 0;
        this.payee = payee;
        this.payamount = payamount;
        this.paydate = paydate;
        this.memo = memo;
        this.fk_users = fk_users;
    }

    find(id, callback) {
        getTransactions(id, callback);
    }
};

Transaction.getTransactions = function(callback) {
    getTransactions(null, callback);
}

Transaction.findById = function(id, callback) {
    getTransactions(id, callback);
}

function getTransactions(id, callback) {
    var db = new Db();
    if (!id) {
        db.query('SELECT * FROM transactions;', null, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            if (!row) {
                console.error('no transaction found');
                callback({'error':'No transaction found'});
            }
            callback(null, row);
        });
    }
    else {
        db.query('SELECT * FROM transactions WHERE id=?;', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            if (!row) {
                console.error('no transaction found');
                callback({'error':'No transaction found'});
            }
            callback(null, row);
        });
    }
}

module.exports = Transaction;