const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
    number: { type: String, lowercase: true, unique: true },
    permits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permit' }]
});

exports.Plate = mongoose.model('Plate', PlateSchema);