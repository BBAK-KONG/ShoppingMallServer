const express = require("express");
const router = express.Router();
const models = require("../models");

//장바구니 추가
router.post("/add", async (req, res) => {
  
    const basketInfo = {
        user_id : req.body.user_id,
        product_id : req.body.product_id,
        count : req.body.count
    }

    models.Basket.create(basketInfo)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          result: false,
          message: "장바구니 추가하는데 오류가 발생했습니다.",
        });
      });
  });


    
    // 해당 회원의 장바구니 상품들 리턴
    router.post("/userbasket", async(req, res, next) => {

        var productList = await models.Basket.findAll({
    
            attributes : ['product_id'],
            where : {
                user_id : req.body.user_id
            }
        });

     
        var result = [];

        for(var index = 0 ; index <Object.keys(productList).length;index ++ ){

            var resultProduct = await models.Product.findOne({
    
                where : {
                    product_id : productList[index].product_id,
                }
            });
            var data ={};
            data.product_id = resultProduct.product_id;
            data.name = resultProduct.name;
            data.image = resultProduct.image;
            data.price =resultProduct.price;
            data.information = resultProduct.information;
            data.count = 1;
           
            result.push(data);
        }

        res.json(result);
       
        
        
      });
    

  module.exports = router;