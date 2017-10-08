
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, is_admin: true, first_name: 'Bill', last_name: 'McFadden', email: 'runbmc@gmail.com', password: 'admin'},
        {id: 2, first_name: 'Beef', last_name: 'Deluxe', email: 'beef.deluxe@gmail.com', password: 'beefhouse'}
      ]);
    });
};
