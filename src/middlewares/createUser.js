const usersModel = require('../models/usersModel');

const checkUserEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Invalid entries. Email not informed.'})
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email)) return res.status(400).json({ message: 'Invalid entries. Email in wrong format.'});
  if (await usersModel.getByEmail(email)) {
      res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const checkUserUsername = (req, res) => {
  const { username } = req.body;
  if (!username || username.length <= 6) {
    return res.status(400).json({ message: 'Invalid entries. Username length must be at least 6'})
  };
  next();
};

const checkUserPassword = (req, res) => {
  const { password } = req.body;
  if(!password || password.length <= 6) {
    return res.status(400).json({ message: 'Invalid entries. Username length must be at least 6'})
  };
  next();
};

const checkUserRole = (req, res) => {
  const { role } = req.body;
  if(!role) {
    return res.status(400).json({ message: 'Invalid entries. Role not informed.'})
  };
  if(role != 'Developer' || role != 'Scrum Master' || role != 'Project owner') {
    return res.status(400)
      .json({ message: 'Invalid entries. Role must be "Developer" or "Scrum Master" or "Project owner".'})
  }
  next();
}

module.exports = {
  checkUserEmail,
  checkUserUsername,
  checkUserPassword,
  checkUserRole,
};
