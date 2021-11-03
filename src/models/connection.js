const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dbUser:dbUserPassword@cluster0.ie6v8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let schema = null;

async function getConnection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Ebytr'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { getConnection };
