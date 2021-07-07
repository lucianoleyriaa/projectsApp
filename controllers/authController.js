const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const JWT = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('./../utils/AppError');

const createAndSend = (statusCode, user, res) => {
  const token = createToken(user.id);

  res.status(statusCode).json({
    status: 'Success',
    token
  });
}

const createToken = id => {
  return JWT.sign({id}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = catchAsync (async (req, res, next) => {
    const user = await User.create(req.body);

    createAndSend(201, user, res);
});

exports.login = catchAsync( async (req, res, next) =>  {
  if (!(req.body.email) || !(req.body.password)) throw new Error('You must enter an email and a password!');

  const user = await User.findOne( { where: {email: req.body.email, active: true} } );

  // if (!user) throw new Error('The user does not exist. Please signup!');
  if (!user) return next(new AppError('The user or the password entered are not valid!', 404));

  if (!(await user.verifyData(req.body.password, user.password))) {
    return next(new AppError('The user or the password entered are not valid!', 404));
  }

  createAndSend(200, user, res);

});

exports.protect = catchAsync( async (req, res, next) => {

  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    throw new Error('You are not loggin. Please login!');
  }

  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET_KEY);

  const user = await User.findOne( {
    attributes: ["id", "name", "email", "passwordChangedAt"],
    where: {
      id: decoded.id
    }
  });

  if (!user) throw new Error('The user beloging to this token does not longer exists!!');

  if(!user.verifyPasswordDate(user, decoded.iat)) {
    throw new Error('The user has changed the password! Please, log in again')
  }

  req.user = user;

  next();

})

exports.updatePassword = catchAsync( async (req, res, next) => {
  
  if ((!req.body.currentPassword) || (!req.body.newPassword)) {
    throw new Error('You must provide your current password and your new password!');
  }

  const user = await User.findOne({where: {id: req.user.id}});

  if (! await user.verifyData(req.body.currentPassword, user.password)) {
    throw new Error('The password entered is not valid!');
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).json({
    status: 'Success',
    message: 'The password was changed successfully!'
  })
});

