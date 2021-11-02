const checkTaskDescription = (req, res, next) => {
  const { taskDescription } = req.body;
  if (!taskDescription) return res.status(400).json({ message: 'Invalid entries. taskDescription required' });
  if (taskDescription.length <= 10) {
    return res.status(400)
      .json({ message: 'Invalid entries. Task description must have at least 10 characters' });
  }
  return next();
};

const checkStatus = (req, res, next) => {
  let { status } = req.body;
  if (!status) {
    status = 'Pendente';
    req.body.status = 'Pendente';
  }
  if (status === 'Pendente' || status === 'em andamento' || status === 'Pronto') {
    return next();
  }
  return res.status(400).json({ message: 'Invalid entries. Status has a wrong value' });
};

const checkUserRolePermission = (req, res, next) => {
  const { role } = req.creator;
  if (role === 'Developer') return res.status(400).json({ message: 'Developers cannot create a new task' });
  return next();
};

module.exports = {
  checkTaskDescription,
  checkStatus,
  checkUserRolePermission,
};
