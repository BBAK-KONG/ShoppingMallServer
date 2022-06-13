const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const { sequelize } = require("./models");
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(expressSession({

  secret: 'my key',
  resave: true,
  saveUninitialized:true

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




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "login.html"));
});

app.listen(3000, () => {
  console.log("Express App on port 3000!");
});
