const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { DateTime } = require('luxon');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  created_at: { type: Date, default: Date.now() },
});

// // Formatted date to be used in front end
// UserSchema.virtual('created_at_formatted').get(function () {
//   return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
// });

module.exports = mongoose.model('User', UserSchema);
