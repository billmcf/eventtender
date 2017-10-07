'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorite_drinks', (table)=>{
    table.increments('id').primary();
    table.text('name').notNullable().defaultTo('');
    table.text('story').notNullable().defaultTo('');
    table.text('type').notNullable().defaultTo('');
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorite_drinks')
};
