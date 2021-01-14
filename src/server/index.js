const fakeData = require('./database');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
let database = fakeData();

app.get('/users', (req, res) => {
  res.status(200).end(JSON.stringify(database.data));
});

app.get('/users/:userId', (req, res) => {
  const {
    params: {
      userId
    } 
  } = req;
  const result = database.data.filter(item => item.id === parseInt(userId));
  res.status(200).end(JSON.stringify(result));
});

app.post('/users', (req, res) => {
  res.status(201).end(JSON.stringify({ Description: 'USER CREATED'}));
});

app.listen(PORT, function () {
  const { port } = this.address();
  console.log(`Server listening at port... ${port}`);
});