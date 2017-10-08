var express = require('express');
var knex= require('../knex')
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('drinks get');
});
router.post('/', (req, res, next)=>{
  res.send('drinks post')
})
router.delete('/', (req, res, next)=>{
  res.send('drinks delete')
})

module.exports = router;
