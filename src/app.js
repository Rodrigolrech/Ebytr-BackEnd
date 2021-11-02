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
const checkPermission = require('./middlewares/checkPermission');

const checkSorted = require('./middlewares/checkSorted');

const { checkNewStatus, checkNewTaskDescription } = require('./middlewares/checkUpdateTask');

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

app.get('/tasks', validateJWT, checkSorted, toDoListControllers.getAllTasks);

app.delete('/tasks/:_id', validateJWT, checkIfTaskExists, checkPermission, toDoListControllers.deleteTask);

app.put(
  '/task/:_id',
  validateJWT,
  checkIfTaskExists,
  checkNewStatus,
  checkNewTaskDescription,
  checkStatus,
  toDoListControllers.updateTask,
);

module.exports = app;
