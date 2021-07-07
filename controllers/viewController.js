const Projects = require('../models/projectModel');
const Tasks = require('../models/taskModel');
const catchAsync = require('./../utils/catchAsync');

exports.login = async(req, res) => {
  res.status(200).render('login');
}

exports.signup = async(req, res) => {
  res.status(200).render('signup');
}

exports.getProjects = async (req, res) => {
  try {
    const Proyectos = await Projects.findAll();

    res.render('base', {
      Proyectos
    });

  } catch {
    console.log(e)
  }
}

exports.getProject = async (req, res) => {
  try {

    const AllProjects = Projects.findAll();
    // console.log('Esto esta antes' , req.params.id);
    const project = Projects.findOne({
      where: {
        id: req.params.id
      }
    });
  
    const [Proyectos, Proyecto] = await Promise.all([AllProjects, project]);

    Proyectos[Proyectos.findIndex(pro => pro.id === Proyecto.id)]['active'] = true;

    const tareas = await Tasks.findAll({
      where: {
        project_id: req.params.id
      }
    });
  
    res.status(200).render('project', {
      Proyectos,
      Proyecto,
      tareas
    })
  } catch (e) {
    console.log(e)
  }
};

exports.newProject = async(req, res) => {

  try {
    const Proyectos = await Projects.findAll();
    
    res.status(200).render('newProject', {
      Proyectos
    });

  } catch(e) {
    console.log(e);
  }
};

exports.editProject = async(req, res) => {
  const AllProjects = Projects.findAll();
  const Project = Projects.findOne({
    where: {
      id: req.params.id
    }
  });

  const [Proyectos, Proyecto] = await Promise.all([AllProjects, Project]);

  res.status(200).render('editProject', {
    Proyectos,
    Proyecto
  });
}

exports.newTask = async(req, res) => {
  const Proyectos = await Projects.findAll();
  const Proyecto = await Projects.findOne({
    where: {
      id: req.params.id
    }
  });
  
  res.status(200).render('newTask', {
    Proyectos,
    Proyecto
  })
};

exports.editTask = async(req, res) => {
  const AllProjects = Projects.findAll();
  const task = Tasks.findOne({where: {id: req.params.idTask}})
  const Project = Projects.findOne({where: {id: req.params.idProject}})

  const [Proyectos, tarea, Proyecto] = await Promise.all([AllProjects, task, Project])

  res.status(200).render('editTask', {
    Proyectos,
    tarea,
    Proyecto
  })
}