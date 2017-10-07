var express = require('express');
var router = express.Router();
const boom= require('boom')
var emailReg=/@/;
/* GET users listing. */
//var {first_name}=req.body
router.post('/', function(req, res, next, err) {
  //console.log(req.body)
  // if(!req.body.first_name||!req.body.first_name.trim()){
  //   return next(boom.create(400, 'please provide a first name'));
  // }
  // if(!req.body.last_name||!req.body.last_name.trim()){
  //   return next(boom.create(400, 'please provide a first and last name'));
  // }
  // if(!req.body.email||!req.body.email.trim()||emailReg.test(req.body.email===false)){
  //   return next(boom.create(400, 'please provide a valid email'));
  // }
  // if(!req.body.password){
  //   return next(boom.create(400, 'please provide a password'));
  // }
  res.send('users post a go go');
});

module.exports = router;
