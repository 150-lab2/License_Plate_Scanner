const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({
    name: String
});

exports.Org = mongoose.model('Org', OrgSchema);