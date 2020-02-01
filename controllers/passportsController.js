const express = require("express");
const router = express.Router();
//FROM AUTH.JS//
// var express = require('express');
// var router = express.Router();
// var sendMail = require('../public/assets/js/contact');
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
dotenv.config();
/// FROM USERS .JS //////////
var secured = require('../lib/middleware/secured');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
////////EVENTUALLY REQUIRE MODEL HERE FOR DB FUNCTIONS ///////////////////
const db = require('../models')
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const transporter = nodemailer.createTransport(mailGun());

const auth = {
    auth: {
        api_key: '81fadf6a029207bb6526b9c443e4fdb2-074fa10c-dc354498',
        domain: 'sandbox6a458234bbe34ecfa1d36814305d03af.mailgun.org'
    }
};

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'group2.passport@gmail.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

var contactjs = ('/assets/js/contact.js');

router.post('/email', function ( req, res) {
    const { subject, email, text} = req.body;
    console.log('Data: ', req.body);
  
    sendMail(email, subject, text, function(err, data) {
      if (err) {
        res.status(500).json({ message: 'Internal Error' });
      } else {
        res.json({ message: 'Email Sent' });
      }
    });
  });

/* GET index page. */
router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Welcome to Passport'
    });
});


/* GET about page. */
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About Passport'
    });
});

/* GET services page. */
router.get('/services', function (req, res, next) {
    res.render('services', {
        title: 'Passport Services'
    });
});


/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
    const {
        _raw,
        _json,
        ...userProfile
    } = req.user;

    // create user w email
    // then...


    res.render('user', {
        title: 'Dashboard'
        // userProfile: JSON.stringify(userProfile, null, 2)

    });
});

///// FROM AUTH.JS////////////   

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), function (req, res) {
    //////////database query for user email or nickname here 
    //  if (if req.user.trip )
    res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            return res.redirect(returnTo || '/user');
        });
    })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    // req.logout();

    var returnTo = req.protocol + '://' + req.hostname;
    var port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ':' + port;
    }

    var logoutURL = new url.URL(
        util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
    );
    var searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
});


/* GET contact page. */
router.get('/contact', function (req, res, next) {

    res.render('contact', {
        title: 'Contact our Team', 
        contactform: contactjs
    });
});

router.get("/api/trips", function (req, res) {
    const userID = req.user.id
    db.Trip.findAll({
            where: {
                user_id: userID
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

//trip create statement
router.post("/api/trips", function (req, res) {
    const {
        tripname,
        totalbudget,
        destination,
        departing,
        returning
    } = req.body;
    const userID = req.user.id

    db.Trip.create({
            tripname: tripname,
            totalbudget: totalbudget,
            destination: destination,
            departing: departing,
            returning: returning,
            user_id: userID
        }).then(function (data) {

            res.json(data);
        })
        .catch(function (err) {

            res.json(err);
        });
});

router.get("/api/trips/:id", function (req, res) {
    userID = req.user.id;
    db.Trip.findOne({
        where: {
            id: req.params.id,
            user_id: userID
        }
    }).then(function (dbTrip) {
        res.json(dbTrip);
    });
});

/* GET MYTRIPS . */
router.get('/mytrips', function (req, res, next) {
    res.render('myTrips', {
        title: 'My Trips'
    });
});

// ROUTE FOR INDIVIDUAL USERS INDIVIDAL TRIP DASHBOARD
router.get('/tripDash/:id', function (req, res, next) {
    userID = req.user.id;
    db.Trip.findOne({
        where: {
            id: req.params.id,
            user_id: userID
        }
    }).then(function (dbTrip) {
        res.render('tripDash', {
            title: 'Dashboard'
        });
    });
});

router.get("/api/budgetbreakdown", function (req, res) {
    db.BudgetBreakdown.findAll({}).then(function (dbBB) {
        res.json(dbBB);
    });
});

//finds a certain budget breakdown
router.get("/api/budgetbreakdown/:id", function (req, res) {
    db.BudgetBreakdown.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbBB) {
        res.json(dbBB);
    });
});

// gets budget breakdown of a specific trip
router.get("/api/budgetbreakdown/trips/:id", function (req, res) {
    db.BudgetBreakdown.findAll({
        where: {
            TripId: req.params.id
        }
    }).then(function (dbBB) {
        res.json(dbBB);
    });
});

/////// NEEDS TO BE DEBUGGGGGGGGGED
// updates planned out budget breakdown of a specific trip
router.put("/api/budgetbreakdown/trips/:id", function (req, res) {
    console.log(req)
    userID = req.user.id
    const {
        budget
    } = req.body

    budget.forEach(element => {
        console.log(`${element} i am ${element.BudgetCategoryId}`)

        console.log(budget)
        db.BudgetBreakdown.update(element,

            {
                where: {
                    TripId: req.params.id,
                    BudgetCategoryId: element.BudgetCategoryId
                }
            }).then(function (dbBB) {
            res.json(dbBB);
        });
    })
});

//  POST route for a new instance of a budgetbreakdown
router.post("/api/budgetbreakdown", function (req, res) {

    const {
        budget
    } = req.body;

    db.BudgetBreakdown.bulkCreate(
            budget).then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// gets expenses by querying user ID
router.get("/api/expenses", function (req, res) {

    const userID = req.user.id
    db.Expense.findAll({
            where: {
                user_id: userID
            }
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});

router.get("/api/expenses/trips/:id", function (req, res) {

    const userID = req.user.id
    db.Expense.findAll({
            where: {
                TripId: req.params.id,
                user_id: userID
            },
            include: [db.Trip]
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});



router.post("/api/expenses", function (req, res) {

    const {
        amount,
        description,
        BudgetCategoryId,
        TripId
    } = req.body;

    const userID = req.user.id

    db.Expense.create({
            amount: amount,
            description: description,
            user_id: userID,
            BudgetCategoryId: BudgetCategoryId,
            TripId: TripId
            /////////insert foriegn key of user id here 
        }).then(function (data) {

            res.json(data);
        })
        .catch(function (err) {

            res.json(err);
        });
});

router.get("/api/expenses/:id", function (req, res) {
    const userID = req.user.id

    db.Expense.findOne({
            where: {
                id: req.params.id,
                user_id: userID
            }
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});



module.exports = router;