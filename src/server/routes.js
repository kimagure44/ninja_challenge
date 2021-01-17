module.exports = app => {
  const users = require('./controller.js')
  app.get('/users/:userId?', users.apiGET)
  app.post('/users', users.apiPOST)
  app.put('/users', users.apiPUT)
  app.delete('/users', users.apiDELETE)
}
