const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
});

exports.Plate = mongoose.model('Plate', PlateSchema);