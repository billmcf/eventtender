'use strict'
const express= require('express');
const router= express.Router();
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const knex= require('../knex');
const emailReg= /@/;
const boom= require('boom')


router.get('/', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, _payload)=>{
    if(err){
      return res.send(false)
    }
    res.send(true)
  })
});

router.post('/', (req, res, next)=>{
  if(!req.body.email||!req.body.email.trim()||emailReg.test(req.body.email)===false){
    return next(boom.create(400, 'please input an email'))
  }
  if(!req.body.password){
    return next(boom.create(400, 'please input a password'))
  }
  knex('users').where({email:req.body.email}).then((user)=>{
    if(user.length===0){
      return next(boom.create(400, 'invalid email or password'))
    }
    if(req.body.password!==user[0]['password']){
      return next(boom.create(400, 'invalid email or password'))
    }
    knex('users').where({email: req.body.email}).then((user)=>{
      var idOfInterest=user[0]['id'];
      var token= jwt.sign(idOfInterest, process.env.SECRET_KEY);
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 302400000),
        secure: router.get('env') === 'production'
      })
      res.send('Login Succesful')
    })
      .catch((err) => {
     next(err);
   });
  })
})
router.delete('/', (req, res)=>{

  res.clearCookie('token')
  res.end();
})


module.exports = router;
