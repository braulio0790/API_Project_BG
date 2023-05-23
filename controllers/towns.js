const connectiondb = require('../dbconnection/dbconnection');
const ObjectId = require('mongodb').ObjectId;

//Get all towns 
const getTowns = async (req, res) => {
    const result = await connectiondb.getDb().db().collection('towns').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

//Modify Towns
const updateTown = async (req, res) => {
    const town_id = new ObjectId(req.params.id);
    const towninfo = {
      town: req.body.town,
    };
    const response = await connectiondb.getDb().db().collection('towns').replaceOne({ _id: town_id }, towninfo);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

  module.exports = { getTowns, updateTown };