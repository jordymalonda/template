const request = require('request-promise');
const User = require('../models/user');
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
        data.push(`hitungan ke ${i + 1}`)
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
  bobi: async (req, res) => {

    let data = 'benar';
    if (req.params.name !== 'joko') {
      data = 'salah';
      return res.status(200).json(data)
    }
    return res.status(200).json(data);

  },



  create: async (req, res) => {
    const date = await helper.getDate();
    try {
      req.checkBody({
        name: { notEmpty: true, errorMessage: 'name must be field' },
        email: { notEmpty: true, errorMessage: 'email must be field' },
        password: { notEmpty: true, errorMessage: 'password must be field' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].message,
        });
      }

      const exist = await User.findOne({
        where: {
          email: req.body.email,
        }
      });

      if (exist) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: 'user already exist'
        });
      }

      const params = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        created_at: date,
        updated_at: date
      }

      const result = await User.create(params)

      return res.status(httpStatus.ok).json(result);
    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },

  update: async (req, res) => {
    const date = await helper.getDate();
    try {
      req.checkBody({
        id: { notEmpty: true, errorMessage: 'id must be field' },
        //name: { notEmpty: true, errorMessage: 'name must be field' }
      });
      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].message,
        });
      }

      const exist = await User.findOne({
        where: {
          id: req.body.id
        }
      });

      if (!exist) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: 'user not found'
        });
      }

      const params = {
        name: req.body.name,
        updated_at: date
      }

      const result = await User.update(params, {
        where: {
          id: req.body.id,
        }
      });

      const filanResult = await User.findOne({
        where: {
          id: req.body.id
        }
      });

      return res.status(httpStatus.ok).json(filanResult);

    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },

  get: async (req, res) => {
    try {

      const exist = await User.findAll();

      return res.status(httpStatus.ok).json(exist);
    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },

  delete: async (req, res) => {
    const date = await helper.getDate();
    try {
      req.checkBody({
        id: { notEmpty: true, errorMessage: 'id must be field' },
        //name: { notEmpty: true, errorMessage: 'name must be field' }
      });
      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].message,
        });
      }

      const exist = await User.findOne({
        where: {
          id: req.body.id
        }
      });

      if (!exist) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: 'user not found'
        });
      }

      const hapus = await User.destroy({
        where: {
          id: req.body.id
        }
      });

      return res.status(httpStatus.ok).json(hapus);

    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  }


}
