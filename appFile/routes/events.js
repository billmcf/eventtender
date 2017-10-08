var express = require('express');
var router = express.Router();
const jwt= require('jsonwebtoken')
const boom= require('boom')
const knex=require('../knex')

router.get('/', function(req, res, next) {
  if(Object.keys(req.cookies).length===0){
    return next(boom.create(400, 'user access only'));
  }
  var reveal= jwt.verify(req.cookies.token, process.env.SECRET_KEY)
  knex('events').where({user_id: reveal}).then((events)=>{
    if(events.length===0){
      res.send("No events created yet")
    }else if(events.length>0){
      res.send(events)
    }
  })
});
router.post('/', (req, res, next)=>{
  if(Object.keys(req.cookies).length===0){
    return next(boom.create(400, 'user access only'));
  }
  var reveal= jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  req.body.user_id=reveal;
  knex('events').max('id').then((max)=>{
    var id=max[0]['max']+1;
    req.body.id=id;
    knex('events').insert(req.body).then((event)=>{
      knex('events').where({id: id}).then((event)=>{
        delete event[0].user_id
        res.send(event)
      })
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
  console.log(eventId);
  knex('events').select('id').then((id)=>{
    res.send(id)
  })


})

module.exports = router;
