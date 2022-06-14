const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");

// 회원 전체 조회
router.get("/", (req, res, next) => {
  models.User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//회원 id로 회원정보 조회
router.get("/:user_id/profiles", (req, res, next) => {
  models.User.findOne({
    where: { user_id: req.params.user_id },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 회원가입 - id중복 확인 후 가입
router.post("/", (req, res, next) => {

  models.User.findOne({
    where : {user_id : req.body.user_id }
  })
  .then((data) => {

    if(data) {      //중복되는 아이디가 있을때
      res.status(400).json({
        result : false,
        message : "이미 존재하는 아이디입니다."
      })
    }
    else {
      models.User.create({
        user_id: req.body.user_id,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender,
        email: req.body.email,
        birth : req.body.birth
      })
        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  })
 
});

// 회원정보 수정
router.put("/:user_id", (req, res, next) => {
  models.User.update(
    {
      user_id: req.body.user_id,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      email: req.body.email,
    },
    {
      where: { user_id: req.params.user_id },
    }
  )
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//회원 삭제
router.delete("/:user_id", (req, res, next) => {
  models.User.destroy({
    where: { user_id: req.params.user_id },
  })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 로그인
router.post("/login", (req, res, next) => {
  var paramId = req.body.id ;
  var paramPw = req.body.password ;

  if (req.session.user) {
    console.log("이미 로그인되어 상품페이지로 이동");
    res.redirect("/public/html/product.html");
  } 
  else {
    req.session.user = {
      id: paramId,
      name: "zini",
      authorized: true,
    };
    res.writeHead("200", {
      "Content-Type": "text/html;charset=utf8",
    });

    res.write("<h1>로그인 성공</h1>");
    res.write("<div><p>Param ID: " + paramId + "</p></div>");
    res.write("<div><p>Param PW: " + paramPw + "</p></div>");
    res.write(
      "<br><a href=http://localhost:3000/product'>상품 페이지로 이동</a>"
    );
    res.end();
  }

});

// 로그인된 상태가 아니면 로그인페이지로 링크
router.route("/product").get(function (req, res) {
  console.log("/product 호출됨");
  if (req.session.user) {
    res.redirect("/public/html/product.html");
  } else {
    res.redirect("/public/html/login.html");
  }
});

// 로그아웃
router.route("/logout").get(function (req, res) {
  console.log("/logout 호출됨");

  if (req.session.user) {
    console.log("로그아웃");

    req.session.destroy(function (err) {
      if (err) throw err;
      console.log("세션 삭제하고 로그아웃됨");
      res.redirect("/public/html/login.html");
    });
  } else {
    console.log("로그인 상태 아님");
    res.redirect("/public/html/login.html");
  }
});

module.exports = router;
