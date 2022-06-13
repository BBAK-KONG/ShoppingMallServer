const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const { verifyToken } = require('./middlewares');

require('dotenv').config();  //.env 파일에서 환경변수 가져오기



// 토큰을 발급하는 라우터
router.post('/', async (req, res) => {
  try {
    // body 값으로 id, password받음
    const user_id = req.body.user_id;
    const password = req.body.password;

    // jwt.sign() 메소드: 토큰 발급
    const token = jwt.sign({
      user_id,
      password,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', // 1분
      issuer: '토큰발급자',
    });

    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token,
    });
  }

  catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

// 발급된 토큰을 테스트하는 라우터
router.get('/', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;