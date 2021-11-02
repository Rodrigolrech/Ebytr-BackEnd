const moment = require('moment');
const toDoListService = require('../services/toDoListService');

const insertNewTask = async (req, res) => {
  const {
    taskDescription, status,
  } = req.body;
  const { creatorUser } = req.creator;
  const createdDate = moment().format('DD/MM/YYYY hh:mm:ss');
  const response = await toDoListService
    .insertNewTask(taskDescription, status, creatorUser, createdDate);
  return res.status(response.status).json(response.message);
};

module.exports = {
  insertNewTask,
};