const toDoListModel = require('../models/toDoListModel');
// const { params: { _id }, body: { taskDescription, newStatus }, taskDescriptionHistory } = req;

const checkNewStatus = async (req, _res, next) => {
  const { body: { status }, params: { _id } } = req;
  if (!status) {
    const task = await toDoListModel.getTaskById(_id);
    req.body.newStatus = task.status;
  }
  return next();
};

const checkNewTaskDescription = async (req, _res, next) => {
  const { body: { taskDescription }, params: { _id } } = req;
  if (taskDescription) {
    const task = await toDoListModel.getTaskById(_id);
    if (task.taskDescriptionHistory) {
      req.taskDescriptionHistory = [...task.taskDescriptionHistory, task.taskDescription];
    } else {
      req.taskDescriptionHistory = [task.taskDescription];
    }
  }
  return next();
};

module.exports = {
  checkNewStatus,
  checkNewTaskDescription,
};
