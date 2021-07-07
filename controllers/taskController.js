const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.getTasks = catchAsync(async(req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    status: 'Success',
    tasks
  });
});

exports.getTask = catchAsync(async(req, res, next) => {
  const task = await Task.findOne({where: {id: req.params.id}});

  res.status(200).json({
    status: 'Success',
    task
  });
});

exports.createTask = catchAsync(async(req, res, next) => {
  const x = {...req.body};
  x.project_id = req.params.idProject;

  x.name = x.name[0].toUpperCase() + x.name.slice(1);

  const tasks = await Task.create(x);

  // res.status(201).json({
  //   status: 'Success',
  //   tasks
  // });
  res.redirect(`/projects/${req.params.idProject}`);
});

exports.updateTaskState = catchAsync(async(req, res) => {
  const tarea = await Task.findOne({where: {id: req.params.id}});

  let estado = 0;

  if(tarea.complete == estado) {
    estado = 1
  }

  tarea.complete = estado;

  await tarea.save();

  res.status(200).json({
    status: 'Success',
    estado
  });

});

exports.updateTask = catchAsync(async(req, res) => {
  await Task.update(req.body, {where: {id: req.params.id}})

  res.status(200).json({
    status: 'Success',
    data: {}
  })
});

exports.deleteTask = catchAsync(async(req, res, next) => {
  const task = await Task.destroy({where: {id: req.params.id}});

  if (!task) throw new Error('The task you are trying to delete is not longer exists!');

  res.status(204).json({
    status: 'Success',
    data: null
  });
});
