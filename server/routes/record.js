const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/index').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('inventory')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching inventory!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you get one record.
recordRoutes.route("/index/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { id: req.params.id };
  db_connect
      .collection("inventory")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route('/index').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    id: req.body.id,
    index_name: req.body.index_name,
    app_name: req.body.app_name,
    policy: req.body.policy,
    data_stream: req.body.data_stream,
    shard: req.body.shard,
    replica: req.body.replica,
  };

  dbConnect
    .collection('inventory')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting inventory!');
      } else {
        console.log(`Added a new match with id ${matchDocument.id}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route('/index/:id').put(function (req, response) {
  const dbConnect = dbo.getDb();
  const listingQuery = { id: req.params.id };
  console.log(listingQuery)
  //console.log(req.body)
  const updates = {
    $set: {
      id: req.body.id,
      index_name: req.body.index_name,
      app_name: req.body.app_name,
      policy: req.body.policy,
      data_stream: req.body.data_stream,
      shard: req.body.shard,
      replica: req.body.replica
    }
  }
  const matchDocument = {
    _id: req.body._id,
  };
  dbConnect
    .collection('inventory')
    .updateOne(listingQuery, updates, matchDocument, function (err, res) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
          console.log(listingQuery.id)
          console.log(err)
      } else {
        console.log('1 document updated');
        response.json({
          _id: req.body._id,
          id: req.body.id,
          index_name: req.body.index_name,
          app_name: req.body.app_name,
          policy: req.body.policy,
          data_stream: req.body.data_stream,
          shard: req.body.shard,
          replica: req.body.replica
        } );
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/index/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { id: req.params.id };
  dbConnect
    .collection('inventory')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.id}!`);
      } else {
        console.log(`1 document deleted with id ${listingQuery.id}!`)
      }
    });
});

module.exports = recordRoutes;
