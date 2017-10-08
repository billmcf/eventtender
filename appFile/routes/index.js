var express = require('express');
var router = express.Router();
const boom= require('boom');
const knex= require('../knex');

// router.get('/', (req, res, next)=>{
//   knex('favorites').where({id: 1}).then((drinkReqs)=>{
//     res.send(drinkReqs)
//   })
// })
router.get('/show/drinks', (req, res, next)=>{
  knex('drinks').where({event_id: 1}).then((drinkList)=>{
    res.send(drinkList)
  })
})

module.exports = router;
