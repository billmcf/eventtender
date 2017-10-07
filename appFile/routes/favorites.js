var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('favorites get');
});
router.post('/', (req, res, next)=>{
  res.send('favorites post')
})
router.delete('/', (req, res, next)=>{
  res.send('favorites delete')
})

module.exports = router;
