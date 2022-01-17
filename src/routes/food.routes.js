'use strict'

const express = require('express');

const {FoodCollection} = require('../models');

const router = express.Router();

router.get('/food', read);
router.get('/food/:id', read);
router.post('/food', create);
router.put('/food/:id', update);
router.delete('/food/:id', remove);

async function read(req, res, next) {
  try{
    let { id } = req.params;
    console.log('GET HIT:', id ? "id = " + id : "all requested");
    let foods;
    if (id) {
      foods = await FoodCollection.read(id);
    } else {
      foods = await FoodCollection.read();
    }
    if(!foods) throw "Error Reading Food Collection";
    res.status(200).json(foods);
  } catch (err){
    res.status(404).send(err);
  }
}

async function create(req, res, next) {
  console.log('POST HIT: ');
  try{
    let createObj = req.body;
    let createdItem = await FoodCollection.create(createObj);

    if(!createdItem) throw "Error Creating Item Food Collection";
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
      let updatedItem = await FoodCollection.update(id, updateObj);

      if(!updatedItem) throw "Error Updating Item Food Collection";
      res.status(202).json(updatedItem);
    } else {
      throw "Error Updating Item Food Collection: No ID Given";
    }
  } catch (err){
    res.status(500).send(err);
  }
}


async function remove(req, res) {
  try{
    let {id} = req.params;
    console.log('DELETE HIT: id -', id);
    let tempObj = await FoodCollection.read(id);
    let deletedItem = await FoodCollection.remove(id);

    if(!deletedItem) throw "Error Deleting Item Food Collection";
    res.status(202).send({deletedObject: tempObj.results});
  } catch (err){
    res.status(500).send(err);
  }
}

module.exports = router;