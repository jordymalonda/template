const Sequelize = require('sequelize');
const db = require('../configs/db');

const Detail = db.define('detail', {
  id: { primaryKey: true, type: Sequelize.STRING },
  uid: Sequelize.STRING,
  type: Sequelize.STRING,
  currency: Sequelize.STRING,
  amount: Sequelize.DOUBLE,
  coin_amount: Sequelize.DOUBLE,
  status: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
}, {
  tableName: 'detail',
  timestamps: false
});

module.exports = Detail;
