var express = require('express');
var router = express.Router();

//API routes
router.use('/api', require('./api'));

//HTML routes

module.exports = router;