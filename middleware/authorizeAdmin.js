const asyncHandler = require('express-async-handler');
const User = require('../models/user_model');

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  const username = req.user.username;
  const user = await User.find({ username: username }).exec();

  req.user.is_admin = user[0].is_admin;
  req.user.id = user[0]._id;

  next();
});

module.exports = authorizeAdmin;
