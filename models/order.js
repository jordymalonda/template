const Sequelize = require('sequelize');
const db = require('../configs/db');

const Order = db.define('order', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  uid: Sequelize.TEXT,
  type: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  address: Sequelize.STRING,
  coin: Sequelize.STRING,
  status: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
}, {
  tableName: 'order',
  timestamps: false
});

module.exports = Order;
