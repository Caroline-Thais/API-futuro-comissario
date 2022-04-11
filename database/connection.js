var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'Passei1t',
      database : 'apiusers'
    }
  });

module.exports = knex