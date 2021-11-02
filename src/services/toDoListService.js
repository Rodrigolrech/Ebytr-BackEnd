const toDoListModel = require('../models/toDoListModel');

const insertNewTask = async (taskDescription, status, creatorUser, createdDate) => {
  const message = await toDoListModel
    .insertNewTask(taskDescription, status, creatorUser, createdDate);
  return { status: 201, message };
};

module.exports = {
  insertNewTask,
};
