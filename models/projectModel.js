const Sequelize = require('sequelize');
const router = require('../routes/userRoutes');
const sequelize = require('../utils/database');
const User = require('./userModel');

const project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'You must provide a name for the project'
      },
      max: 128
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'You must provide a description'
      }
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
},
{
  timestamps: true,
  updatedAt: false
});

project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = project;