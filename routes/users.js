const express = require('express');
const router = express.Router();
const models = require('../models');


router.route('/')
    .get(async(req,res,next)=>{      //유저조회
        try{
            const users =await models.User.findAll({
                attributes : ['user_id','name']
            });
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async(req,res,next)=>{      // 유저 등록
        try{
            const user = await models.User.create({
                user_id : req.body.user_id,
                password : req.body.password,
                name : req.body.name,
                phone : req.body.phone,
                address : req.body.address,
                gender : req.body.gender,
                email : req.body.email
            });
            console.log(user);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });



module.exports = router;