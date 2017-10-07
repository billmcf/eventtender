'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/eventtender"
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
