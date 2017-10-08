
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drinks').del()
    .then(function () {
      // Inserts seed entries
      return knex('drinks').insert([
        {id: 1, name: 'Old Fashioned', story: 'A classic drink', type: 'Whiskey', event_id:1},
        {id: 2, name: 'Negroni', story: 'Fruity Pebbles', type: 'Gin', event_id:1},
        {id: 3, name: 'Manhattan', story: 'Now your in New York!', type: 'Whiskey', event_id:1},
        {id: 4, name: 'Daiquiri', story: 'Uh its a drink', type: 'Rum', event_id:1},
        {id: 5, name: 'Dry Martini', story: 'It is 5 oclock somewhere', type: 'Vodka', event_id:1}
      ]);
    });
};
