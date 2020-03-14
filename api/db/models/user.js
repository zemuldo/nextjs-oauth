const mongoose =  require('../mongoose.js');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  oAuthId: { type: Number, required: true },
  profilePhotoUrl: { type: String, required: true}
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);