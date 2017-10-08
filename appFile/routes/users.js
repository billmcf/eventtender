'use strict'
var express = require('express');
var router = express.Router();
const boom= require('boom')
const knex = require('../knex')
const jwt= require('jsonwebtoken')
var emailReg=/@/;

router.post('/', function(req, res, next) {
  if(!req.body.first_name||!req.body.first_name.trim()){
    return next(boom.create(400, 'please provide a first name'));
  }
  if(!req.body.last_name||!req.body.last_name.trim()){
    return next(boom.create(400, 'please provide a first and last name'));
  }
  if(!req.body.email||!req.body.email.trim()||emailReg.test(req.body.email)===false){
    return next(boom.create(400, 'please provide a valid email'));
  }
  if(!req.body.password){
    return next(boom.create(400, 'please provide a password'));
  }
  knex('users').max('id').then((maxId)=>{
    var insertId=maxId[0]['max']+1
    return insertId
  }).then((insertId)=>{
    knex('users').where({email: req.body.email}).then((user)=>{
      if(user.length>0){
         return next(boom.create(400, 'this email is already associated with an account'));
      }
      req.body.id=insertId;
      var token= jwt.sign(insertId, process.env.SECRET_KEY);
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 302400000),
        secure: router.get('env') === 'production'
      })
      knex('users').insert(req.body).then(()=>{
        res.send('post succesful')
      })
          .catch((err) => {
         next(err);
       });
    })
  })
});

module.exports = router;
