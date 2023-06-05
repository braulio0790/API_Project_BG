const { error } = require('server/router');
const connectiondb = require('../dbconnection/dbconnection');
const ObjectId = require('mongodb').ObjectId;

//Get all towns
const getTowns = async (req, res) => {
  const result = await connectiondb.getDb().db().collection('towns').aggregate([
    {
      $lookup: {
        from: "pokemons",
        localField: "area_id",
        foreignField: "area_id",
        as: "Area Pokemons"
      }
    }
  ]);
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
  //aggregate and $lookup function as .find()
  const result = await connectiondb.getDb().db().collection('towns').aggregate([
    {
      $lookup: {
        from: "pokemons",
        localField: "area_id",
        foreignField: "area_id",
        as: "Area Pokemons"
      }
    }
  ]);
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
};

//Insert Town
const insertTown = async (req, res) => {
  const towninfo = {
    area_id: req.body.area_id,
    town: req.body.town,
    gym: req.body.gym,
    badge: req.body.badge,
    enemies: req.body.enemies,
    items: req.body.items,
    leader: req.body.items,
    mission: req.body.mission
  };
  const response = await connectiondb.getDb().db().collection('towns').insertOne(towninfo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

//Insert Pokemons
const insertPokemons = async (req, res) => {
  const pokemonsinfo = {
    area_id: req.body.area_id,
    pokemons: req.body.pokemons
  };
  const response = await connectiondb.getDb().db().collection('pokemons').insertOne(pokemonsinfo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

//Update Towns
const updateTown = async (req, res) => {
  if (!ObjectId.isValid(req.params.town_id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }  
  const town_id = new ObjectId(req.params.town_id);
  const towninfo = {
      area_id: req.body.area_id,
      town: req.body.town,
      gym: req.body.gym,
      badge: req.body.badge,
      enemies: req.body.enemies,
      items: req.body.items,
      leader: req.body.leader,
      mission: req.body.mission
    };
    const response = await connectiondb.getDb().db().collection('towns').replaceOne({ _id: town_id }, towninfo);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

//Update Pokemons
const updatePokemons = async (req, res) => {
  if (!ObjectId.isValid(req.params._id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }  
  const _id = new ObjectId(req.params._id);
  const pokemoninfo = {
      area_id: req.body.area_id,
      pokemons: req.body.pokemons
    };
    const response = await connectiondb.getDb().db().collection('pokemons').replaceOne({_id: _id }, pokemoninfo);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

//Delete Towns
const deleteTown = async (req, res) => {
  if (!ObjectId.isValid(req.params.town_id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }  
  const town_id = new ObjectId(req.params.town_id);
  const response = await connectiondb.getDb().db().collection('towns').deleteOne({ _id: town_id });
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

//Delete Pokemons
const deletePokemons = async (req, res) => {
  if (!ObjectId.isValid(req.params.area_id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }  
  const town_id = new ObjectId(req.params.town_id);
  const response = await connectiondb.getDb().db().collection('pokemons').deleteOne({ area_id: area_id });
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

  module.exports = { getTowns, getSingleTown, insertTown, insertPokemons, updateTown, updatePokemons, deleteTown, deletePokemons };