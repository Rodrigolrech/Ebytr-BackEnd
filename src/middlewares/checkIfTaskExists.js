const toDoListModel = require('../models/toDoListModel');

const checkIfTaskExists = async (req, res, next) => {
  const { _id } = req.params;
  const task = await toDoListModel.getTaskById(_id);
  if (!task) return res.status(404).json({ message: "Task dosen't exist" });
  return next();
};

module.exports = checkIfTaskExists;
