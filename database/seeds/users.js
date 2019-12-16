const bcrypt = require('bcryptjs')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'joe', password: bcrypt.hashSync('pass', 8)},
        {username: 'Monster Kyle', password: bcrypt.hashSync('pass', 8)},
        {username: 'Big brain mike', password: bcrypt.hashSync('pass', 8)}
      ]);
    });
};
