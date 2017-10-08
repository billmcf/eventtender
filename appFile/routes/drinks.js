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
      return next(boom.create(400,"Event does not exist"))
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
  res.send('drinks post')
})
router.delete('/', (req, res, next)=>{
  res.send('drinks delete')
})

module.exports = router;
