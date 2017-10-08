var express = require('express');
var knex= require('../knex')
var router = express.Router();
const boom=require('boom')

router.get('/:id', function(req, res, next) {
  if(Object.keys(req.cookies).length===0){
    return next(boom.create(400, 'user access only'));
  }
  knex('events').where({id: req.params.id}).then((event)=>{
    if(event.length===0){
      return next(boom.create(400, "Event does not exist"))
    }
    knex('drinks').where({event_id: req.params.id}).then((drinks)=>{
      if(drinks.length===0){
        return res.send('No drinks have been saved for this event, please add some!')
      }
      res.send(drinks);
    })
  })
});
router.post('/', (req, res, next)=>{
  if(Object.keys(req.cookies).length===0){
    return next(boom.create(400, 'user access only'));
  }
  if(!req.body.name||!req.body.name.trim()){
    return next(boom.create(400, 'please provide a name'));
  }
  if(!req.body.type||!req.body.type.trim()){
    return next(boom.create(400, 'please provide a type'));
  }
  if(!req.body.story||!req.body.story.trim()){
    return next(boom.create(400, 'please provide a story'));
  }
  if(!req.body.event_id||!req.body.event_id.trim()){
    return next(boom.create(400, 'please provide an event'));
  }
  knex('drinks').max('id').then((max)=>{
    var insertId=max[0]['max']+1;
    req.body.id=insertId;
    knex('drinks').insert(req.body).then(()=>{
      res.send('drink added to event')
    })
  })
})
router.delete('/', (req, res, next)=>{
  if(Object.keys(req.cookies).length===0){
    return next(boom.create(400, 'user access only'));
  }
  if(!req.body.eventId){
    return next(boom.create(400, 'Please enter and event ID'));
  }
  const eventId = Number.parseInt(req.body.eventId);
  if (!Number.isInteger(eventId)) {
    return next(boom.create(400, 'Event ID must be an integer'));
}
  var reveal= jwt.verify(req.cookies.token, process.env.SECRET_KEY)
})

module.exports = router;
