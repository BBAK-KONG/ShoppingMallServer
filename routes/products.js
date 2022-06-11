const express = require('express');
const router = express.Router();
const models = require('../models');
const product = require('../models/product');


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


module.exports = router;