var express = require('express');
var router = express.Router();

var usersAPI = require("./users.api");

//users api routes
router.get('/users/test', usersAPI.test);
router.get('/users', usersAPI.findAll);               //using route /api/users

module.exports = router;
