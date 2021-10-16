const {onError, onBadRequest, onCreated} = require('../../shared/handlers');
const service = require('./gymEquipment.service');

class Controller {
  async create(ctx) {
    try {
      //Realizando validações no request 
      if(!ctx.request.body.name) return onBadRequest('Name cannot be null', ctx);
      if(!ctx.request.body.muscleGroup) return onBadRequest('Muscle group cannot be null', ctx);
      if(!ctx.request.body.code) return onBadRequest('Code cannot be null', ctx);
      
      let res = await service.post(ctx.request.body);

      return onCreated(ctx, res);
    } catch (err) {
      return onError('Error trying to create a gym equipment', err.toString(), ctx);
    }
  }      

}

module.exports = new Controller();