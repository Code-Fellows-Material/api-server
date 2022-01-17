'use strict'

const express = require('express');

const {DogCollection} = require('../models');

const router = express.Router();

router.get('/dog', read);
router.get('/dog/:id', read);
router.post('/dog', create);
router.put('/dog/:id', update);
router.delete('/dog/:id', remove);

async function read(req, res, next) {
  try{
    let { id } = req.params;
    console.log('GET HIT:', id ? "id = " + id : "all requested");
    let dogs;
    if (id) {
      dogs = await DogCollection.read(id);
    } else {
      dogs = await DogCollection.read();
    }
    if(!dogs) throw "Error Reading Dog Collection";
    res.status(200).json(dogs);
  } catch (err){
    res.status(404).send(err);
  }
}

async function create(req, res, next) {
  console.log('POST HIT: ');
  try{
    let createObj = req.body;
    let createdItem = await DogCollection.create(createObj);

    if(!createdItem) throw "Error Creating Item Dog Collection";
    res.status(201).json(createdItem);
  }catch (err){
    res.status(500).send(err);
  }
}

async function update(req, res) {
  try{
    console.log('PUT HIT: ');
    let {id} = req.params;
    let updateObj = req.body;
    if(id){
      let updatedItem = await DogCollection.update(id, updateObj);

      if(!updatedItem) throw "Error Updating Item Dog Collection";
      res.status(202).json(updatedItem);
    } else {
      throw "Error Updating Item Dog Collection: No ID Given";
    }
  } catch (err){
    res.status(500).send(err);
  }
}


async function remove(req, res) {
  try{
    let {id} = req.params;
    console.log('DELETE HIT: id -', id);
    let tempObj = await DogCollection.read(id);
    let deletedItem = await DogCollection.remove(id);

    if(!deletedItem) throw "Error Deleting Item dog Collection";
    res.status(202).send({deletedObject: tempObj.results});
  } catch (err){
    res.status(500).send(err);
  }
}

module.exports = router;