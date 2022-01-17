'use strict'

class Collection {

  constructor(model){
    this.model = model;
    console.log("collection created for:", model);
  }

  async read(id = null){
    try{
      console.log('Read: ', this.model);
      let record;
      if (id) {
        record = await this.model.findOne({where: {id}});
      } else {
        record = await this.model.findAll();
      } 
      let readObject = {
        count: record ? record.length : 1,
        results: record,
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
    console.log('update called: ', id);
    try{
      let recordToUpdate = await this.model.findOne({where: {id}});
      //This method is faster due not having to search the db
      recordToUpdate.set(newRecord);
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