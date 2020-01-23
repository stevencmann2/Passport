var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/services', function (req, res, next) {
res.render('services', { title: 'SERVICESPAGE' });
});

module.exports = router;
