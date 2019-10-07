// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var User = require('./app/models/user');
var Bill = require('./app/models/bill');
var Transaction = require('./app/models/transaction');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bills
// ----------------------------------------------------
router.route('/bills')

    // create a bill (accessed at POST http://localhost:8080/api/bills)
    .post(function(req, res) {

        var bill = new Bill();      // create a new instance of the Bill model
        bill.name = req.body.name;  // set the bill's name (comes from the request)
        bill.amount = req.body.amount;
        bill.duedate = req.body.duedate;
        bill.frequency = req.body.frequency;

        // save the bear and check for errors
        bill.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Bill created!' });
        });

    })

    // get all bills (accessed at GET http://localhost:8080/api/bills)
    .get(function(req, res) {
        Bill.getBills(function(err, bills) {
            if (err) {
                res.send(err);
            }
            res.json(bills);
        });
    });

// on routes that end in /bills/:bill_id
// ----------------------------------------------------
router.route('/bills/:bill_id')

    // get the bill with that id (accessed at GET http://localhost:8080/api/bills/:bill_id)
    .get(function(req, res) {
        Bill.findById(req.params.bill_id, function(err, bill) {
            if (err) {
                res.send(err);
            }
            res.json(bill);
        });
    });

// on routes that end in /transactions
// ----------------------------------------------------
router.route('/transactions')

    // create a transaction (accessed at POST http://localhost:8080/api/transactions)
    .post(function(req, res) {

        var transaction = new Transaction();      // create a new instance of the Transaction model
        transaction.payee = req.body.payee;  // set the transaction's payee (comes from the request)
        transaction.payamount = req.body.payamount;
        transaction.paydate = req.body.paydate;
        transaction.memo = req.body.memo;

        // save the transaction and check for errors
        transaction.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Transaction created!' });
        });

    })

    // get all transactions (accessed at GET http://localhost:8080/api/transactions)
    .get(function(req, res) {
        Transaction.getTransactions(function(err, transactions) {
            if (err) {
                res.send(err);
            }
            res.json(transactions);
        });
    });

// on routes that end in /transactions/:transaction_id
// ----------------------------------------------------
router.route('/transactions/:transaction_id')

// get the transaction with that id (accessed at GET http://localhost:8080/api/transactions/:transaction_id)
.get(function(req, res) {
    Transaction.findById(req.params.transaction_id, function(err, transaction) {
        if (err) {
            res.send(err);
        }
        res.json(transaction);
    });
});

// on routes that end in /user
// ----------------------------------------------------
router.route('/user')

    // get user (accessed at GET http://localhost:8080/api/user)
    .post(function(req, res) {

        var user = new User(
            req.body.email, 
            req.body.password
        );

        user.find(function(err, userRecord) {
            if (err) {
                res.send(err);
            }
            res.json(userRecord);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
