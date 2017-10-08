
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name: 'Landing Page', date:'1992-08-05', user_id:1},
        {id: 2, name: 'Beef the World Behind', date:'1982-08-05', user_id:2},
        {id: 3, name: 'Chicken Parm Convention', date:'1972-08-05', user_id:3},
      ]);
    });
};
