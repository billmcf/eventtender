var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('events get');
});
router.post('/', (req, res, next)=>{
  res.send('events post')
})
router.delete('/', (req, res, next)=>{
  res.send('events delete')
})

module.exports = router;
