const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const filterUpdates = (updates, ...updatesAllowed) => {
  const x = {};

  Object.keys(updates).forEach(el => {
    if (updatesAllowed.includes(el)) {
      x[el] = updates[el]; 
    }
  })

  return x;
}

exports.updateMe = catchAsync( async (req, res, next) => {

  if (req.body.password || req.body.currentPassword) {
    throw new Error('If you want to update your password, please use /updateMyPassword');
  }

  const x = filterUpdates(req.body, "name", "email");

  const user = await User.update(x, {where:{id: req.user.id}});

  res.status(200).json({
    status: 'Success',
    user
  })
});

exports.deleteMe = catchAsync( async (req, res, next) => {
  await User.update({active: false}, {where: {id: req.user.id}})

  res.status(204).json({
    status: 'Success',
    data: null
  });
});