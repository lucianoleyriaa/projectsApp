const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const filterUpdates = require('../utils/filterUpdates');

exports.getMyProjects = catchAsync( async (req, res, next) => {
  const projects = await Project.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name"]
      }
    ],
    where: {user_id: req.user.id}
  });

  res.status(200).json({
    status: 'Success',
    projects
  });
});

exports.getProject = catchAsync( async(req, res, next) => {
  const project = await Project.findOne({
    include: [
      {
        model: Task,
        attributes: {exclude: ['createdAt']}
      }
    ],
    where: {id: req.params.id, user_id: req.user.id}
  });

  if (!project) throw new Error('Any project found!');

  res.status(200).json({
    status: 'Success',
    project
  });
});

// exports.createProject = catchAsync( async (req, res, next) => {
//   const data = {...req.body};
//   data.user_id = req.user.id;

//   const project = await Project.create(data);

//   res.status(201).json({
//     status: 'Success',
//     project
//   });
// });

exports.createProject = async(req, res, next) => {
  try {

    const data = {...req.body}
  
    console.log(data);
  
    data.name = data.name[0].toUpperCase() + data.name.slice(1);
    data.description = data.description[0].toUpperCase() + data.description.slice(1);
  
    await Project.create(data);
  
    res.redirect('/');
    
  } catch (e) {
    console.log(e);
  }
};

// exports.updateProject = catchAsync( async (req, res, next) => {
//   const x = filterUpdates(req.body, "name", "description");
  
//   const project = await Project.update(x, {
//     where: {id: req.params.id, user_id: req.user.id}
//   });

//   if (project[0] === 0) throw new Error('Project not found to update!')

//   res.status(200).json({
//     status: 'Success',
//     message: 'The project was updated successfully!'
//   });
// });

exports.updateProject = async(req, res) => {
  await Project.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  res.status(200).json({
    status: 'Success',
    data: {}
  })
}

// exports.deleteProject = catchAsync( async (req, res, next) => {
//   const project = await Project.destroy({where: {id: req.params.id, user_id: req.user.id}});

//   if (!project) throw new Error('The project you are trying to delete is not longer exists!')
  
//   res.status(204).json({
//     status: 'Success',
//     data: null
//   });
// });

exports.deleteProject = catchAsync( async (req, res, next) => {
  const project = await Project.destroy({where: {id: req.params.id}});

  if (!project) throw new Error('The project you are trying to delete is not longer exists!')
  
  res.status(204).json({
    status: 'success',
    data: {}
  });

});