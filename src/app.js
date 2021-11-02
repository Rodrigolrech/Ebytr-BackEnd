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

const validateJWT = require('./middlewares/validateJWT');
const { checkTaskDescription, checkStatus, checkUserRolePermission } = require('./middlewares/createNewTask');
const toDoListControllers = require('./controllers/toDoListControllers');

const checkIfTaskExists = require('./middlewares/checkIfTaskExists');

const app = express();
app.use(bodyParser.json());

app.post('/', checkLogin, usersControllers.login);
app.post('/user',
  checkUserEmail,
  checkUserPassword,
  checkUserRole,
  checkUserUsername,
  usersControllers.createUser);

app.post(
  '/newTask',
  validateJWT,
  checkTaskDescription,
  checkStatus,
  checkUserRolePermission,
  toDoListControllers.insertNewTask,
);

app.delete('/tasks/:_id', checkIfTaskExists, toDoListControllers.deleteTask);

module.exports = app;
