const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'sample202_35.html'));
});



app.listen(3000, () => {
  console.log('Express App on port 3000!');
});
