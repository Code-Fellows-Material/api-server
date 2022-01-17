'use strict'

const express = require('express');

const {foodCollection} = require('../models/Collection.js');

const router = express.Router();

router.get('/food', read);
router.get('/food/:id', read);
router.post('/food', create);
router.put('/food/:id', update);
router.put('/food/:id', updateAll);
router.delete('/food/:id', remove);

async function read(req, res, next) {
  try{
    console.log('GET HIT');
    let { id } = req.params;
    let foods;
    if (id) {
      foods = await foodCollection.read(id);
    } else {
      foods = await foodCollection.read();
    }
    res.status(200).json(foods);
  } catch (err){
    res.status(404).send(err);
  }
}

async function create(req, res, next) {
  console.log('POST HIT: ');
  try{
    let createObj = req.body;
    let createdItem = await foodCollection.create(createObj);
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
      let updatedItem = await foodCollection.update(id, updateObj);
      res.status(202).json(updatedItem);
    }
  } catch (err){
    res.status(500).send(err);
  }
}


async function remove(req, res) {
  try{
    console.log('DELETE HIT');
    let {id} = req.params;
    let deletedItem = await foodCollection.delete(id);
    res.status(204).send(deletedItem);
  } catch (err){
    res.status(500).send(err);
  }
}

module.exports = router;