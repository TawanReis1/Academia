const AcademiaContext = require('../../shared/academia-management-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: {type: String, required: true, maxLength: 200},
    muscleGroup: {type: String, default: 'BICEPS', enum: ["QUADRICEPS", "SHOULDER", "TRAPEZE", "BICEPS", "TRICEPS", "FOREARM", "CHEST", "ABDOMEN", "BACK", "CALF"]},
    code: {type: Number, required: true }
  }, 
  {
    versionKey: false, 
    timestamps: true
  }
);

schema.plugin(mongooseDelete, { overrideMethods:true});

module.exports.GymEquipment = schema;
module.exports.GymEquipment = AcademiaContext.conn.model('GymEquipment', schema);