const router = require('express').Router();

const Users = require('./userModel');
const restricted = require('../auth/restrictedMiddleware')
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
