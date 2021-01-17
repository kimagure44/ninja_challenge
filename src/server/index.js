const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

require('./routes.js')(app)

app.listen(PORT, function () {
  const { port } = this.address()
  console.log(`Server listening at port... ${port}`)
})