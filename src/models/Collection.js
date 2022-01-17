'use strict'

class Collection {

  constructor(model){
    this.model = model;
  }

  async read(id){
    try{
      console.log('Read: ', this.model);
      let record;
      if (id) {
        record = await this.model.findOne({where: {id}});
      } else {
        record = await this.model.findAll();
      } 
      let readObject = {
        count: record ? readVal.length : 1,
        results: record,
      };
      return readObject;
    } catch (err){
      return -1;
    }
  }

  async create(data) {
    try{
      const record = await this.model.create(data);
      return record;
    } catch(err){
      return -1;
    }
  }

  async update(id, newRecord) {
    console.log('update called: ', id);
    try{
      let recordToUpdate = await this.model.findById(id);
      //This method is faster due not having to search the db
      recordToUpdate.set(newRecord);
      await recordToUpdate.save(); 
      return recordToUpdate;
    } catch (err){
      return -1;
    }    
  }

  remove(id) {
    console.log('remove called: ', id);
    try{
      let recordToDestroy = await this.model.destroy({
        where: {
          id: id,
        },
      });
      recordToDestroy.destroy();
      return recordToUpdate;
    } catch (err){
      return -1
    }
  }
}