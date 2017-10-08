var express = require('express');
var router = express.Router();
const boom= require('boom');
const knex= require('../knex');

router.get('/show/drinks', (req, res, next)=>{
  knex('drinks').where({event_id: 1}).then((drinkList)=>{
    res.send(drinkList)
  })
  .catch((err) => {
      next(err);
  });
})

module.exports = router;
