
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table)=>{
    table.increments('id').primary();
    table.text('name').notNullable().defaultTo('')
    table.date('date').notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
