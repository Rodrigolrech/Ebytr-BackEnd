const mongoConnection = require('./connection');

const usersCollection = await mongoConnection.getConnection()
.then((db) => db.collection('users'));

const login = async (email, password) => {
  const userLogged = await usersCollection.findOne({ email, password });
  return userLogged;
};

const createUser = async (username, email, password, role) => {
  const { insertedId: _id} = await usersCollection.insertOne({ username, email, password, role });
  const userCreated = { _id, username, email, role };
  return userCreated;
}

const getByEmail = async (email) => {
  const userWithEmail = await usersCollection.findOne({ email });
  return userWithEmail;
}


module.exports = {
  login,
  createUser,
  getByEmail,
};
