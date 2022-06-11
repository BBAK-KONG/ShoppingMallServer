const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const {sequelize} = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


// db연결
sequelize.sync({force: false})
    .then(()=>{
        console.log("DB Connected Success");
    })
    .catch((err)=> {
        console.error(err);
    });


app.use('/users', require('./routes/users'));          // 유저
app.use('/products',require('./routes/products'));     // 상품


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'sample202_35.html'));
});


app.listen(3000, () => {
  console.log('Express App on port 3000!');
});
