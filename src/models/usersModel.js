const mongoConnection = require('./connection');

const login = async (email, pwd) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));
  const userLogged = await getCollection.findOne({ email, password: pwd });
  return userLogged;
};

const createUser = async (username, email, password, role) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));
  const { insertedId: _id } = await getCollection.insertOne({
    username, email, password, role,
  });
  const userCreated = {
    _id, username, email, role,
  };
  return userCreated;
};

const getByEmail = async (email) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));
  const userWithEmail = await getCollection.findOne({ email });
  return userWithEmail;
};

module.exports = {
  login,
  createUser,
  getByEmail,
};
