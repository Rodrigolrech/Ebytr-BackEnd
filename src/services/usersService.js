require('dotenv').config()
const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const secret = process.env.secret || "minhasenhasecreta";
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '999m'
};

const login = async (email, pwd) => {
  const userLogged = await usersModel.login(email, pwd);
  if (!userLogged) {
    return { status: 401, message: { message: 'Incorrect email or password' }}
  }
  const { password, ...userLoggedWithoutPassword } = userLogged;
  const token = jwt.sign({ data: userLoggedWithoutPassword }, secret, jwtConfig );
  return { status: 200, message: { token } };
};

const createUser = async (username, email, password, role) => {
  const message = await usersModel.createUser(username, email, password, role)
  return { status: 201, message};
};

module.exports = {
  login,
  createUser,
};
