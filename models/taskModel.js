const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Project = require('./projectModel');

const task = sequelize.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'You must provide a name for the task'
      },
      max: 128
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  project_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Project,
      key: 'id'
    }
  }
},
{
  timestamps: false,
  updatedAt:false
});

task.belongsTo(Project, {
  foreignKey: 'project_id',
  // ondelete: cascade => me permite eliminar todos los elemento que estan referenciado a una tabla fuerte
  onDelete: 'CASCADE'
});

module.exports = task;