const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const { sequelize } = require("./models");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const { Cookie } = require("express-session");
const FileStore = require('session-file-store')(session);

require('dotenv').config();  //.env 파일에서 환경변수 가져오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'image')));
app.use(cookieParser());

app.use(session({

  secret: process.env.SESSION_SECRET ,   // 데이터를 암호화 하기 위해 필요한 옵션
  resave: false,  // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
  saveUninitialized:true,  // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
  store : new FileStore(),
  cookie: {
    maxAge : 30000,
    httpOnly : true,
    Secure : true
  }

}));



// db연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/users", require("./routes/users")); // 유저
app.use("/products", require("./routes/products")); // 상품
app.use("/tokens", require("./routes/tokens")); // 토큰
//app.use("/images",require("./routes/images")); // 이미지




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "login.html"));
});

app.listen(3000, () => {
  console.log("Express App on port 3000!");
});
