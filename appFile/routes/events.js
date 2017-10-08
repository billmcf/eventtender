var express = require('express');
var router = express.Router();
const jwt= require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(!req.cookies){
    res.send('no cookies for you')
  }
  var reveal= jwt.verify(req.cookies.token, process.env.SECRET_KEY)
  res.send(reveal)
});
router.post('/', (req, res, next)=>{
  res.send('events post')
})
router.delete('/', (req, res, next)=>{
  res.send('events delete')
})

module.exports = router;
