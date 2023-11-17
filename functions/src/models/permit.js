const mongoose = require('mongoose');

const PermitSchema = new mongoose.Schema({
    range: { start: String, end: String },
    org: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
});

exports.Permit = mongoose.model('Permit', PermitSchema);