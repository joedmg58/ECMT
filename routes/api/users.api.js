const db = require('../../models');

var usersAPI = {

    test: function(req, res) {
        console.log('testing users api..');
        res.setHeader('Content-Type', 'text/plain');
        res.send('Hello users');
    },

    findAll: function (req, res) {
        console.log('finding all uers...')
        db.User
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    findById: function(req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    findByEmail: function(req, res) {
        db.User
            .find({email: req.body.email, password: req.body.password} /*, {role:1}*/)  //with uncomented line it will bringing only the role and ObjectId of the document
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    create: function(req, res) {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    update: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    remove: function(req, res) {
        db.User
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }

}

module.exports = usersAPI;

/*
var express = require('express');
var router = express.Router();

var controllerUser = require('../../controllers/controller.user');

//Match route "/api/users"
router
    .route('/')
    .get(controllerUser.findAll);

module.exports = router;
*/