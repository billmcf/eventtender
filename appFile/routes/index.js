var express = require('express');
var router = express.Router();
const boom= require('boom');
const knex= require('../knex');

router.get('/', (req, res, next)=>{
  knex('favorites').where({id: 1}).then((drinkReqs)=>{
    res.send(drinkReqs)
  })
})
router.get('/show/drinks', (req, res, next)=>{
  res.send('here')
})

module.exports = router;
