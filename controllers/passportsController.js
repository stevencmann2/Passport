const express = require("express");
const router = express.Router();
//FROM AUTH.JS//
// var express = require('express');
// var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
dotenv.config();
/// FROM USERS .JS //////////
var secured = require('../lib/middleware/secured');
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
////////EVENTUALLY REQUIRE MODEL HERE FOR DB FUNCTIONS ///////////////////
const db = require('../models')
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/* GET index page. */
router.get('/', function (req, res, next) {
    // console.log('req.user ' + req.user + 'req.user')
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

    // console.log(req);
    // console.log(req.user)
    res.render('user', {
        title: 'Dashboard',
        userProfile: JSON.stringify(userProfile, null, 2)

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
        // console.log(user)
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
            res.redirect(returnTo || '/user');
        });
    })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();

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
        title: 'Contact our Team'
    });
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////////           ////////////////////////////////////
////////////////////////            ////////////////////////////////////

// POSTING NEW USER & TRIP //

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// GET route for getting all of the posts
////////// done done done
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
//DONE DONE DONE DONE DONE
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
    // console.log('THIS IS THE CONSOLE')
    // console.log(req.user.id);
    db.Trip.create({
            tripname: tripname,
            totalbudget: totalbudget,
            destination: destination,
            departing: departing,
            returning: returning,
            user_id: userID
            /////////insert foriegn key of user id here 
        }).then(function (data) {

            res.json(data);
        })
        .catch(function (err) {

            res.json(err);
        });
});
// gets trip with specific trip #
// pass in user object for security? reveals user object 

router.get("/api/trips/:id", function (req, res) {
    db.Trip.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbAuthor) {
        res.json(dbAuthor);
    });
});

///// done done 
/* GET MYTRIPS . */
router.get('/mytrips', function (req, res, next) {
    res.render('myTrips', {
        title: 'My Trips'
    });
});

/////////// WORKS BUT USER HAS ACCESS TO ANY TRIP?
           // NEED TO PASS IN USER BELOW?????  . catch????
           // test w/ dynamic elements later!!!!!!

// ROUTE FOR INDIVIDUAL USERS INDIVIDAL TRIP DASHBOARD
router.get('/tripDash/:id', function (req, res, next) {
    //this is an attempt////// if statement
     
    ////
   db.Trip.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbTrip) {
        res.render('tripDash', {
            title: 'Dashboard'
        });
    });
});

////////////////   DONE DONE DONE
//////////
router.get("/api/budgetbreakdown", function (req, res) {
    db.BudgetBreakdown.findAll({
    }).then(function (dbBB) {
        res.json(dbBB);
    });
});

////////////////   DONE DONE DONE
//////////
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

////////////////   DONE DONE DONE
//////////
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

// updates planned out budget breakdown of a specific trip
router.put("/api/budgetbreakdown/trips/:id", function (req, res) {

    
    // console.log(req.body)
    const {budget} = req.body
    console.log('000000000000000000000000000000000000000000000000')
    // console.log(req.body)
    console.log(budget)
    db.BudgetBreakdown.update(budget,
        
           {where: {
            TripId: req.params.id
        }
    }).then(function (dbBB) {
        res.json(dbBB);
    });
});

//  POST route for a new instance of a budgetbreakdown
  router.post("/api/budgetbreakdown", function(req, res) {
    //   console.log('hello world')
    // const {
    //     description,
    //     amountDesired, 
    //     BudgetCategoryId,
    //     tripId
    // }=req.body
    const {budget} = req.body;
    console.log(req.body)
    console.log(budget)
    db.BudgetBreakdown.bulkCreate(
        budget).then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        res.json(err);
    });
});

// gets expenses by querying user ID
///////////// DONE //////////////////
router.get("/expenses", function( req, res){

    res.render( "expenses", {
        title: 'My Expenses'
    });
});




router.get("/api/expenses", function (req, res) {
    
    const userID = req.user.id
    console.log(userID)
    db.Expense.findAll({
            where: {
                user_id: userID
            }
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});



router.post("/api/expenses", function (req, res) {
    // console.log('INSERTINGGGGGGGGGGGGGGGGGGGGGG WE ARE INSERTINNNNNNNNNNNG')
    const {
        amount, 
        description, 
        BudgetCategoryId,
        TripId
    } = req.body;
    // console.log('this is the req.body'+ req.body)
    console.log(req.body)
    const userID = req.user.id

    // console.log('THIS IS THE CONSOLE')
    // console.log(req.user.id);
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

////////////////
////////////// DEBUG NOT SHOWING 'NULLLLL' ALSO PASS IN USERID
router.get("/api/expenses/:id", function (req, res) {
    console.log(req.params.id);

    db.Expense.findOne({
            where: {
                id: req.params.id     
            }
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});


router.get("/api/expenses/trips/:id", function (req, res) {
    const userID = req.user.id
    console.log(userID)
    console.log(req.params.id)
    db.Expense.findAll({
            where: {
                user_id: userID,
                TripId: req.params.id
            },
            include:[{
            model: db.BudgetBreakdown,
            where: {TripId: req.params.id}
                    }]
        })
        .then(function (dbExpense) {
            res.json(dbExpense);
        });
});








// db.Expense.findAll({
//     where: {
//         tripID: req.params.id

//     },
//     include: [
//         {
//         model: db.BudgetBreakdown,
//         as: TripId





//         }
//     ]
// })
















module.exports = router;