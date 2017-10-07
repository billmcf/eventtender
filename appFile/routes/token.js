var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('token get');
});
router.post('/', (req, res, next)=>{
  res.send('token post')
})
router.delete('/', (req, res, next)=>{
  res.send('token delete')
})


module.exports = router;
