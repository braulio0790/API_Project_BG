const { error } = require('server/router');
const connectiondb = require('../dbconnection/dbconnection');
const ObjectId = require('mongodb').ObjectId;

//Get all towns
const getTowns = async (req, res) => {
  const result = await connectiondb.getDb().db().collection('towns').find();
  result.toArray().then((lists) => {
    if (lists.length == 0){
      res.status(400).json('there is no information in the document');
    }else{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    }
  });
};

//Get single town
const getSingleTown = async (req, res) => {
  if (!ObjectId.isValid(req.params.town_id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const town_id = new ObjectId(req.params.town_id);
  const result = await connectiondb.getDb().db().collection('towns').find({ _id: town_id });
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
};

//Insert Town
const insertTown = async (req, res) => {
  const towninfo = {
    town: req.body.town
  };
  const response = await connectiondb.getDb().db().collection('towns').insertOne(towninfo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};


//Modify Towns
const updateTown = async (req, res) => {
  if (!ObjectId.isValid(req.params.town_id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }  
  const town_id = new ObjectId(req.params.town_id);
  const towninfo = {
      town: req.body.town,
    };
    const response = await connectiondb.getDb().db().collection('towns').replaceOne({ _id: town_id }, towninfo);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

//Delete Towns
const deleteTown = async (req, res) => {
  const town_id = new ObjectId(req.params.town_id);
  const response = await connectiondb.getDb().db().collection('towns').deleteOne({ _id: town_id });
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

  module.exports = { getTowns, getSingleTown, insertTown, updateTown, deleteTown };