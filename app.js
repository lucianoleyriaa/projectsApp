const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
const sequelize = require("./utils/database");

const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const taskRouter = require("./routes/taskRoutes");
const viewRouter = require("./routes/viewRoutes");

const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

// Establecemos el motor de vistas a utilizar y su ubicacion
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

// body-parser me permite acceder a los datos que se envian desde un formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

sequelize
   .sync()
   .then((result) => {
      app.listen(5000, () => {
         console.log("Server running on port 5000");
      });
   })
   .catch((e) => {
      console.log(e);
   });

/* Le indicamos a express que vamos a utilizar el siguiente controlador para los errores */
app.use(globalErrorHandler.globalErrorController);
