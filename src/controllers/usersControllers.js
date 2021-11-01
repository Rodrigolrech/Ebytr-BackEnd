const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await usersService.login(email, password);
  return res.status(response.status).json(response.message);
}

module.exports = {
  login,
};
