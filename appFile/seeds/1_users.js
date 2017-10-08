
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, is_admin: true, email: 'runbmc@gmail.com', password: 'admin'},
        {id: 2, email: 'beef.deluxe@gmail.com', password: 'beefhouse'},
        {id: 3, email: 'chicken.parm@gmail.com', password: 'chickenparm'}
      ]);
    });
};
