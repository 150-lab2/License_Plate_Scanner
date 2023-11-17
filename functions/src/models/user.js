const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {first: String, last: String },
    email: { type: String, lowercase: true, unique: true },
    password: String,
    plates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plate' }],
});

exports.User = mongoose.model('User', UserSchema);