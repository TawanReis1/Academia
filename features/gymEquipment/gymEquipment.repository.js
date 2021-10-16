const {GymEquipment} = require('./gymEquipment.model');


class Repository {
  create(gymEquipment) {
    return GymEquipment.create(gymEquipment);
  }
}

module.exports = new Repository();