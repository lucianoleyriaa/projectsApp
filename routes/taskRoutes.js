const express = require('express');
const router = express.Router({mergeParams: true});

const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

// router.use(authController.protect);

// project/asbdjas/tasks
router  
  .route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

// router.post('/', taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTaskState)
  .delete(taskController.deleteTask);

router
  .route('/editTask/:id')
  .patch(taskController.updateTask)

// router.get('/:id', taskController.getTask);
// router.delete('/:id', taskController.deleteTask);


module.exports = router;