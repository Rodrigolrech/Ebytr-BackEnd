const express = require('express');
const bodyParser = require('body-parser');

const { checkLogin } = require('./middlewares/checkLogin');
const {
  checkUserEmail,
  checkUserPassword,
  checkUserUsername,
  checkUserRole,
} = require('./middlewares/createUser');
const usersControllers = require('./controllers/usersControllers');

const app = express();
app.use(bodyParser.json());

app.post('/', checkLogin, usersControllers.login);
app.post('/user',
  checkUserEmail,
  checkUserPassword,
  checkUserRole,
  checkUserUsername,
  usersControllers.createUser);

module.exports = app;
