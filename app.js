const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const {sequelize} = require('./models');

app.use(express.static(path.join(__dirname, 'public')));


sequelize.sync({force: false})
    .then(()=>{
        console.log("DB Connected Success");
    })
    .catch((err)=> {
        console.error(err);
    });


app.use('/user', require('./routes/users'));
app.use('/product',require('./routes/products'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'sample202_35.html'));
});



app.listen(3000, () => {
  console.log('Express App on port 3000!');
});
