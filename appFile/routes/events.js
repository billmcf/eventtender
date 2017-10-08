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
  // res.send(req.body)
  knex('events').max('id').then((max)=>{
    var id=max[0]['max']+1;
    req.body.id=id;
    knex('events').insert(req.body).then(()=>{
      res.send("Event Added")
    })
  })
})
router.delete('/', (req, res, next)=>{
  res.send('events delete')
})

module.exports = router;
