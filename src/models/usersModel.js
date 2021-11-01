const mongoConnection = require('./connection');

const login = async (email, password) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const userLogged = await usersCollection.findOne({ email, password });
  return userLogged;
};

module.exports = {
  login,
};
