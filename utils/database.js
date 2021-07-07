const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'project',
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  { dialect: 'mysql', 'host': process.env.DATABASE_HOST },
  { logging: false }
);

module.exports = sequelize;