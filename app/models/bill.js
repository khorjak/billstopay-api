// app/models/bill

const Db = require('./db');

class Bill {
    constructor(
        name,
        amount,
        duedate,
        frequency,
        url,
        inactive,
        fk_users
    ) {
        this.id = 0;
        this.name = name;
        this.amount = amount;
        this.duedate = duedate;
        this.frequency = frequency;
        this.url = url;
        this.inactive = inactive;
        this.fk_users = fk_users;
    }

    find(id, callback) {
        getBills(id, callback);
    }

    save(callback) {
        try {
        
        } catch (err) {
            console.log(err.message);
            callback(err);
        }
    }
};

Bill.getBills = function(callback) {
    getBills(null, callback);
}

Bill.findById = function(id, callback) {
    getBills(id, callback);
}

function getBills(id, callback) {
    var db = new Db();
    if (!id) {
        db.query('SELECT * FROM bills;', null, (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            if (!row) {
                console.error('no bill found');
                callback({'error':'No bill found'});
            }
            callback(null, row);
        });
    }
    else {
        db.query('SELECT * FROM bills WHERE id=?;', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            }
            if (!row) {
                console.error('no bill found');
                callback({'error':'No bill found'});
            }
            callback(null, row);
        });
    }
}

module.exports = Bill;