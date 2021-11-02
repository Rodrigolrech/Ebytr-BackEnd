const mongoConnection = require('./connection');

const insertNewTask = async (taskDescription, status, creatorUser, createdDate) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));
  const { insertedId: _id } = await getCollection.insertOne({
    taskDescription, status, creatorUser, createdDate,
  });
  const newTask = {
    _id, taskDescription, status, creatorUser, createdDate,
  };
  return newTask;
};

module.exports = {
  insertNewTask,
};
