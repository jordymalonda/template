const request = require('request-promise');
const Detail = require('../models/detail');
const { httpStatus, trxStatus } = require('./../configs/codes');
const Sequelize = require('./../configs/db');
const helper = require('./helper');
const cuid = require('cuid');
const config = require('../config');
const logger = require('../utils/logger');
// const { Op } = require('sequelize');

module.exports = {
  limitation: async (req, res) => {
    try {
      req.checkQuery({
        limit: { notEmpty: true, errorMessage: 'limit field is required' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors
        });
      }

      const data = [];

      for (let i = 0; i < req.query.limit; i++) {
        data.push(`hitungan ke ${i+1}`)
      }
      return res.status(httpStatus.ok).json(data);
    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },
    bobi : async (req, res) => {
    
    let data = 'benar';
    if (req.params.name !== 'joko') {
      data = 'salah';
      return res.status(200).json(data)
    }
    return res.status(200).json(data);
        
    }

}
