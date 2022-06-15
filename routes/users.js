const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
router.post("/exist", (req, res, next) => {
  models.User.findOne({
    where: { user_id: req.body.user_id },
  })
    .then((users) => {
      res.status(200).send({
        message: "이미 존재하는 id입니다",
        exist: true
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "사용가능한 id입니다",
        exist: false
      });
    });
});


// 회원가입 
router.post("/register", async (req, res) => {
 
  // 해시함수 10번돌려서 password 암호화
  const hashedPassword =  bcrypt.hashSync(req.body.password, 10);

  const userInfo = {
    user_id: req.body.user_id,
    password: hashedPassword,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    email: req.body.email,
    birth: req.body.birth,
  };
  models.User.create(userInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        result: false,
        message: "회원가입하는데 오류가 발생하였습니다.",
      });
    });
});

// 로그인
router.post("/login", async (req, res, next) => {
  var inputId = req.body.user_id;
  var inputPassword = req.body.password;

  if (req.session.user) {
    res.status(500).send({
      message: "이미 로그인 되어있습니다.",
    });
  } else {
    req.session.user = {
      id: inputId,
      authorized: true,
    };

    models.User.findOne({
      where: { user_id: inputId },
    })
      .then((data) => {
        if (data) {
          let dbPassword = data.get("password");
    
          const isEqualPassword =  bcrypt.compareSync(inputPassword, dbPassword);
          
          const hashedPassword =  bcrypt.hashSync(inputPassword, 10);

          if (isEqualPassword) {
            return res.status(200).json({
              message: "로그인 성공",
              status: true,
              
            });
          } else {
            return res.status(400).json({
              message: "비밀번호가 틀립니다",
              status: false
            });
          }
        }
        else{
          return res.status(401).json({
            message : "존재하지 않은 회원입니다",
            status: false
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "회원가입 서버 오류",
          status: false
        });
      });
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

module.exports = router;
