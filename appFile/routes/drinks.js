var express = require('express');
var knex = require('../knex')
var router = express.Router();
const boom = require('boom')
const jwt = require('jsonwebtoken')

var drinkPing = 0;

router.get('/:id', function(req, res, next) {
  if (Object.keys(req.cookies).length === 0) {
    return next(boom.create(400, 'user access only'));
  }
  //figure out a way to make it so only the proprietor of the event can see the drinks
  knex('events').where({id: req.params.id}).then((event) => {
    if (event.length === 0) {
      return next(boom.create(400, "Event does not exist"))
    }
    knex('drinks').where({event_id: req.params.id}).then((drinks) => {
      if (drinks.length === 0) {
        return res.send('No drinks have been saved for this event, please add some!')
      }
      res.send(drinks);
    })
  })
});
router.post('/', (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    return next(boom.create(400, 'user access only'));
  }
  if (!req.body.name || !req.body.name.trim()) {
    return next(boom.create(400, 'please provide a name'));
  }
  if (!req.body.type || !req.body.type.trim()) {
    return next(boom.create(400, 'please provide a type'));
  }
  if (!req.body.story || !req.body.story.trim()) {
    return next(boom.create(400, 'please provide a story'));
  }
  if (!req.body.event_id || !req.body.event_id.trim()) {
    return next(boom.create(400, 'please provide an event'));
  }
  var reveal = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
  var event_id = req.body.event_id



//if post or delete routers break take a look at triple vs double


  knex('events').select('id').where({id: event_id}).then((event) => {
    if (event.length === 0) {
      return next(boom.create(400, 'event does not exist'))
    }
    knex('events').select('id').where({user_id: reveal}).then((id) => {
      if (id.length === 0) {
        return next(boom.create(400, 'You have no events to post drinks to.'))
      }

      var trackerPing = 0;

      for (var i = 0; i < id.length; i++) {

        if (id[i]['id'] == event_id) {
          trackerPing++
        }
      }
      if (trackerPing === 0) {
        return next(boom.create(400, 'Event is not associated with your account'))
      }

      knex('drinks').max('id').then((max) => {
        var insertId = max[0]['max'] + 1;
        req.body.id = insertId;
        knex('drinks').insert(req.body).then(() => {
          res.send('drink added to event')
        })
      })
    })
  })
})
//Layer in error prevention for numbers being put in too high
router.delete('/', (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    return next(boom.create(400, 'user access only'));
  }
  if (!req.body.event_id) {
    return next(boom.create(400, 'Please enter and event ID'));
  }
  const event_id = Number.parseInt(req.body.event_id);
  if (!Number.isInteger(event_id)) {
    return next(boom.create(400, 'Event ID must be an integer'));
  }
  if (!req.body.drink_id) {
    return next(boom.create(400, 'Please select a drink to delete'));
  }
  const drink_id = Number.parseInt(req.body.drink_id);
  if (!Number.isInteger(drink_id)) {
    return next(boom.create(400, 'Drink ID must be an integer'));
  }
  var reveal = jwt.verify(req.cookies.token, process.env.SECRET_KEY)

  knex('events').select('id').where({id: event_id}).then((event) => {
    if (event.length === 0) {
      return next(boom.create(400, 'event does not exist'))
    }
    knex('events').select('id').where({user_id: reveal}).then((id) => {
      if (id.length === 0) {
        return next(boom.create(400, 'You have no events to delete drinks from.'))
      }
      var trackerPing = 0;
      for (var i = 0; i < id.length; i++) {
        if (id[i]['id'] === event_id) {
          trackerPing++;
        }
      }
      if (trackerPing === 0) {
        return next(boom.create(400, 'Event is not associated with your account'))
      }
      knex('drinks').select('id').where({event_id: event_id}).then((drink) => {
        if (drink.length === 0) {
          return next(boom.create(400, 'Event has no drinks'))
        }
        for (var i = 0; i < drink.length; i++) {
          if (drink_id === drink[i]['id']) {
            drinkPing++;
          }
        }
        if (drinkPing === 0) {
          return next(boom.create(400, 'drink not associated with event'))
        }
        knex('drinks').delete().where({id: drink_id}).then(() => {
          res.send('drink has been removed')
        })
      })
    })
  })
})

module.exports = router;
