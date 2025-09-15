const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  referrals: [String], // מזהי משתמשים שהוזמנו
  visits: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', UserSchema);