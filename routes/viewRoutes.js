const express = require("express");
const router = express.Router();

const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.route("/signup").get(viewController.signup);

router.route("/login").get(viewController.login);

// router.use(authController.protect);

router.route("/").get(viewController.getProjects);

router.route("/addProject").get(viewController.newProject);

router.route("/editProject/:id").get(viewController.editProject);

router.route("/:id/task").get(viewController.newTask);

router.route("/:idProject/editTask/:idTask").get(viewController.editTask);

router.route("/projects/:id").get(viewController.getProject);

module.exports = router;
