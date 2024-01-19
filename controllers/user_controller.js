const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const User = require('../models/user_model');

exports.get_users = [
  asyncHandler(async (req, res, next) => {
    if (!req.user.is_admin) return res.send('Not admin');
    const users = await User.find({}).sort('username').exec();
    res.json(users);
  }),
];

exports.get_user = [
  asyncHandler(async (req, res, next) => {
    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.find({ username: req.user.username }).exec();

    if (!clientUser[0].is_admin) {
      if (clientUser[0]._id != paramUser[0]._id)
        return res.send('You are not authorized to get this user info');
    }

    return res.json(paramUser);
  }),
];

exports.update_user = [
  asyncHandler(async (req, res, next) => {
    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.find({ username: req.user.username }).exec();

    if (!clientUser[0].is_admin) {
      if (clientUser[0]._id != paramUser[0]._id)
        return res.send('You are not authorized to get this user info');
    }

    // add new user data here
    await User.findByIdAndUpdate(req.params.id, paramUser, {}).exec();

    return res.send('user updated');
  }),
];

exports.delete_user = [
  asyncHandler(async (req, res, next) => {
    const paramUser = await User.findById(req.params.id).exec();
    const clientUser = await User.find({ username: req.user.username }).exec();

    if (!clientUser[0].is_admin) {
      if (clientUser[0]._id != paramUser[0]._id)
        return res.send('You are not authorized to get this user info');
    }

    await User.findByIdAndDelete(req.params.id).exec();

    // add new user data here

    return res.send('user deleted');
  }),
];
