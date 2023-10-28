const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true },
    plates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plate' }],
});

UserSchema.methods.createNewUser = (email, plateId) => {
    this.email = email;
    this.plates.push(plateId);
    this.model.cre
};

module.exports = mongoose.model('User', UserSchema);