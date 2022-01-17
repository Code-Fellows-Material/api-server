'use strict'

class Collection {

  constructor(model){
    this.model = model;
    console.log("collection created for:", model);
  }

  async read(id){
    try{
      console.log('Read: ', this.model);
      let record;
      let count = 0;
      if (id) {
        record = await this.model.findOne({where: {id}});
        if(!record) {
          record = {};
          count = 0;
        } else {
          count = 1;
        }
      } else {
        record = await this.model.findAll();
        count = record.length;
      } 
      let readObject = {
        count,
        results: count > 0 ? record : [],
      };
      return readObject;
    } catch (err){
      console.error(err);
      return false;
    }
  }

  async create(data) {
    try{
      const record = await this.model.create(data);
      return record;
    } catch(err){
      console.error(err);
      return false;
    }
  }

  async update(id, newRecord) {
    console.log('update called: ', id, newRecord);
    try{
      let recordToUpdate = await this.model.findOne({where: {id}});
      //This method is faster due not having to search the db
      recordToUpdate.update(newRecord);
      await recordToUpdate.save(); 
      return recordToUpdate;
    } catch (err){
      console.error(err);
      return false;
    }    
  }

  async remove(id) {
    console.log('remove called: ', id);
    try{
      let recordToDestroy = await this.model.destroy({
        where: {
          id: id,
        },
      });
      return recordToDestroy;
    } catch (err){
      console.error(err);
      return false;
    }
  }
}

module.exports = Collection;