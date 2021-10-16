const gymEquipmentRepository = require('./gymEquipment.repository');

class Service {

  async post(gymEquipment){ 
    return gymEquipmentRepository.create(gymEquipment); 
  }
}

module.exports = new Service();