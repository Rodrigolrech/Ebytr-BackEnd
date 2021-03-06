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
  let tasks;
  if (!sorted || sorted === 'createdDate') {
    tasks = await getCollection.find().toArray();
  }
  if (sorted === 'taskDescription') {
    tasks = await getCollection.find().sort({ taskDescription: 1 }).toArray();
  }
  if (sorted === 'status') {
    tasks = await getCollection.find().sort({ status: 1 }).toArray();
  }
  return tasks;
};

const updateTask = async (_id, taskDescription, taskDescriptionHistory, status, creator) => {
  const getCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));
  if (taskDescriptionHistory) {
    await getCollection
      .updateOne({ _id: ObjectId(_id) }, [{
        $set: {
          taskDescriptionHistory,
          status,
          taskDescription,
          updatedBy: creator,
        },
      }]);
  } else {
    await getCollection
      .updateOne({ _id: ObjectId(_id) }, [{ $set: { status, updatedBy: creator } }]);
  }
  const task = await getTaskById(_id);
  return task;
};

module.exports = {
  insertNewTask,
  deleteTask,
  getTaskById,
  getAllTasks,
  updateTask,
};
