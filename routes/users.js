const express = require('express');
const router = express.Router();
const models = require('../models');

// 유저 전체 조회
router.get('/', (req, res, next) => {
    models.User.findAll()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

// 유저 등록
router.post('/', (req, res, next) => {
    models.User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married
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