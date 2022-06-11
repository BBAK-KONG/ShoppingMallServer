const express = require('express');
const router = express.Router();
const models = require('../models');

// 회원 전체 조회
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
  
//회원 id로 회원정보 조회
router.get('/:user_id/profiles' , (req,res,next)=>{
    models.User.findOne({
        where : { user_id : req.params.user_id }
    })
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    })
});


// 회원가입
router.post('/', (req, res, next) => {
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
});


// 회원정보 수정
router.put('/:user_id', (req, res, next) => {
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
});


//회원 삭제
router.delete('/:user_id', (req, res, next) => {
    models.User.destroy({
      where : { user_id : req.params.user_id }
    }) 
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
 });

  

  


module.exports = router;