const fakeData = require('./database');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
let database = fakeData();

app.get('/users', (req, res) => {
  res.status(200).end(JSON.stringify(database.data));
});

app.listen(PORT, function () {
  const { port } = this.address();
  console.log(`Server listening at port... ${port}`);
});