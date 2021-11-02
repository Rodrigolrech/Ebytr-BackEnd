const toDoListModel = require('../models/toDoListModel');

const checkPermission = async (req, res, next) => {
  const { creator: { role }, params: { _id } } = req;
  const task = await toDoListModel.getTaskById(_id);
  if (task.creatorUser === 'Scrum Master' && (role === 'Scrum Master' || role === 'Project Owner')) {
    return next();
  }
  if (task.creatorUser === 'Project Owner' && role === 'Project Owner') {
    return next();
  }
  return res.status(400).json({ message: "User dosen't have permission to do this action" });
};

module.exports = checkPermission;
