const { ObjectId } = require('mongodb');
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

const deleteTask = async (_id) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));
  await getCollection.deleteOne({ _id: ObjectId(_id) });
};

const getTaskById = async (_id) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));
  const task = await getCollection.findOne({ _id: ObjectId(_id) });
  return task;
};

const getAllTasks = async (sorted) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));
  const tasks = await getCollection.find().sort({ sorted });
  return tasks;
};

module.exports = {
  insertNewTask,
  deleteTask,
  getTaskById,
  getAllTasks,
};
