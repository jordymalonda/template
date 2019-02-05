const Sequelize = require('sequelize');
const db = require('../configs/db');
const Balance = require('./balance');

const User = db.define('user', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  uid: Sequelize.STRING,
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  identity_number: Sequelize.STRING,
  identity_type: Sequelize.STRING,
  identity_photo: Sequelize.STRING,
  user_photo: Sequelize.STRING,
  user_state: Sequelize.SMALLINT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE
}, {
  tableName: 'user',
  timestamps: false
});

User.belongsTo(Balance, { foreignKey: 'uid' });
Balance.hasOne(User, { foreignKey: 'uid' });

module.exports = User;
