require('dotenv').config()
const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const secret = process.env.secret || "minhasenhasecreta";
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '999m'
};

const login = async (email, password) => {
  const userLogged = await usersModel.login(email, password);
  if (!userLogged) {
    return { status: 401, message: { message: 'Incorrect email or password' }}
  }
  const { password, ...userLoggedWithoutPassword } = userLogged;
  const token = jwt.sign({ data: userLoggedWithoutPassword }, secret, jwtConfig );
  return {status: 200, message: { token }};
};

module.exports = {
  login,
};
