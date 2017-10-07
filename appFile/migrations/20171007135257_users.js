'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
    table.increments('id').primary()
    table.boolean('is_admin').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
