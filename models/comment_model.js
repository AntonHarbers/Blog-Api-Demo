const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Sceham.Types.ObjectId, ref: 'Post', required: true },
  created_at: { type: Date, default: Date.now() },
});

CommentSchema.virtual('url').get(function () {
  return `/comments/${this._id}`;
});

CommentSchema.virtual('created_at_formatted').get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Comment', CommentSchema);
