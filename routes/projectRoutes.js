const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const projectController = require('../controllers/projectController');
const taskRouter = require('../routes/taskRoutes');

router.use('/:idProject/tasks', taskRouter);

// router.use(authController.protect);

// router
//   .route('/')
//   .get(projectController.getMyProjects)
//   .post(projectController.createProject)

router
  .route('/createProject')
  .post(projectController.createProject);

// router
//   .route('/:id')
//   .get(projectController.getProject)
//   .patch(projectController.updateProject)
//   .delete(projectController.deleteProject)

router
  .route('/updateProject/:id')
  .patch(projectController.updateProject);

router
  .route('/deleteProject/:id')
  .delete(projectController.deleteProject);

module.exports = router;