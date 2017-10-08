'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
    table.increments('id').primary()
    table.boolean('is_admin').defaultTo(false);
    table.varchar('email').notNullable().unique();
    table.varchar('password').notNullable();

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
