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

const updateTask = async (_id, taskDescription, taskDescriptionHistory, status, creator) => {
  const taskUpdated = await toDoListModel
    .updateTask(_id, taskDescription, taskDescriptionHistory, status, creator);
  return { status: 200, message: taskUpdated };
};

module.exports = {
  insertNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
};
