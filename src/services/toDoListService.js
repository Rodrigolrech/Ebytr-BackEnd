const toDoListModel = require('../models/toDoListModel');

const insertNewTask = async (taskDescription, status, creatorUser, createdDate) => {
  const message = await toDoListModel
    .insertNewTask(taskDescription, status, creatorUser, createdDate);
  return { status: 201, message };
};

const deleteTask = async (_id) => {
  await toDoListModel.deleteTask(_id);
  return { status: 201, message: { message: `Task with id ${_id} deleted` } };
};

const getAllTasks = async (sorted) => {
  const tasks = await toDoListModel.getAllTasks(sorted);
  return { status: 200, message: tasks };
};

module.exports = {
  insertNewTask,
  deleteTask,
  getAllTasks,
};
