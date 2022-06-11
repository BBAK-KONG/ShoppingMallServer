const express = require('express');
const router = express.Router();
const models = require('../models');

// 유저 전체 조회
router.get('/', (req, res, next) => {
    models.User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  });
  
  // 회원가입
  router.post('/register', (req, res, next) => {
    models.User.create({
        user_id : req.body.user_id,
        password : req.body.password,
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        gender : req.body.gender,
        email : req.body.email
    })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  })

   // 유저 수정
   router.put('/update/:user_id', (req, res, next) => {
    models.User.update({
        user_id : req.body.user_id,
        password : req.body.password,
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        gender : req.body.gender,
        email : req.body.email
    }, {
        where : { user_id : req.params.user_id },
    })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  })

  


module.exports = router;