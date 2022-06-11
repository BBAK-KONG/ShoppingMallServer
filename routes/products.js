const express = require('express');
const router = express.Router();
const models = require('../models');
const product = require('../models/product');

// 상품 전체 조회
router.get('/', (req,res,next)=>{
    models.Product.findAll()
        .then((product)=>{
            res.json(product);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        })
});


//상품 id로 상품정보 조회
router.get('/:product_id/imformation' , (req,res,next)=>{
    models.Product.findOne({
        where : { product_id : req.params.product_id }
    })
    .then((products) => {
        res.json(products);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    })
});


// 상품 등록
router.post('/', (req, res, next) => {
    models.Product.create({

        product_id : null,
        name : req.body.name,
        image : req.body.image,
        price : req.body.price,
        information : req.body.information,
        quantity : req.body.quantity,

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


// 상품 정보 수정
router.put('/:product_id', (req, res, next) => {
    models.Product.update({

        name : req.body.name,
        image : req.body.image,
        price : req.body.price,
        information : req.body.information,
        quantity : req.body.quantity,
        
    }, {
        where : { product_id : req.params.product_id },
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


//상품 삭제
router.delete('/:product_id', (req, res, next) => {
    models.Product.destroy({
      where : { product_id : req.params.product_id }
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