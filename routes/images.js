const express = require("express");
const router = express.Router();
const fs = require('fs');



router.get("/", (req, res) => {
    fs.readFile('../image/banner2.jpg',function(err,data){
        res.writeHead(200,{"Content-Type":"image/png"});
       // res.write(data);
        res.end(data);
        });
     

  });

  module.exports = router;
