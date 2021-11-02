const usersService = require('../services/usersService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await usersService.login(email, password);
  return res.status(response.status).json(response.message);
};

const createUser = async (req, res) => {
  const {
    username, email, password, role,
  } = req.body;
  const response = await usersService.createUser(username, email, password, role);
  return res.status(response.status).json(response.message);
};

module.exports = {
  login,
  createUser,
};
