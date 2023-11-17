const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
    exp: Date,
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
});

module.exports = mongoose.model('Permit', UserSchema);