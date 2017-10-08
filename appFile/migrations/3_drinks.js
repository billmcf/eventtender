'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('drinks', (table)=>{
    table.increments('id').primary();
    table.text('name').notNullable().defaultTo('');
    table.text('story').notNullable().defaultTo('');
    table.text('type').notNullable().defaultTo('');
    table.integer('event_id').references('id').inTable('events').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drinks')
};
