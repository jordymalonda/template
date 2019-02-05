const Sequelize = require('sequelize');
const db = require('../configs/db');

const User = db.define('user', {
  id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,

  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
}, {
    tableName: 'user',
    timestamps: false
  });

module.exports = User;
