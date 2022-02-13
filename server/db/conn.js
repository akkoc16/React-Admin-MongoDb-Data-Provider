const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true, //Set to true to opt in to using the MongoDB driver's new connection management engine.
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("sage_inv");
      console.log("Successfully connected to MongoDB.");
 
      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};