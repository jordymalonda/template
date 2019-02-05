// const request = require('request-promise');
const User = require('../models/user');
const { httpStatus } = require('./../configs/codes');
// const Sequelize = require('./../configs/db');
const helper = require('./helper');
const config = require('../config');
const crypto = require('crypto');
// const { Op } = require('sequelize');

module.exports = {
  create: async (req, res) => {
    const date = await helper.getDate();
    try {
      req.checkBody({
        name: { notEmpty: true, errorMessage: 'name field is required' },
        email: { notEmpty: true, errorMessage: 'email field is required' },
        password: { notEmpty: true, errorMessage: 'password field is required' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].msg
        });
      }

      const exist = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (exist) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: 'user already exist'
        });
      }

      const hash = crypto.createHmac('sha256', config.get('SECRET')).update(req.body.password).digest('hex');

      const params = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        created_at: date,
        update_at: date
      };

      const result = await User.create(params);

      return res.status(httpStatus.ok).json(result);
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
      const result = await User.findAll();

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
        name: { notEmpty: true, errorMessage: 'name field is does not exist' },
        id: { notEmpty: true, errorMessage: 'id field is does not exist' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].msg
        });
      }

      const exist = await User.findOne({
        where: {
          id: req.body.id
        }
      });

      if (!exist) {
        return res.status(httpStatus.notFound).json({
          status: httpStatus.notFound,
          success: false,
          message: 'user not exist'
        });
      }

      const params = {
        name: req.body.name,
        updated_at: date
      };

      const result = await User.update(params, {
        where: {
          id: req.body.id
        }
      });

      return res.status(httpStatus.ok).json(result);
    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },

  delete: async (req, res) => {
    try {
      req.checkQuery({
        id: { notEmpty: true, errorMessage: 'id field is does not exist' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(httpStatus.badRequest).json({
          status: httpStatus.badRequest,
          success: false,
          message: errors[0].msg
        });
      }

      const exist = await User.findOne({
        where: {
          id: req.query.id
        }
      });

      if (!exist) {
        return res.status(httpStatus.notFound).json({
          status: httpStatus.notFound,
          success: false,
          message: 'user not exist'
        });
      }

      const result = await User.destroy({
        where: {
          id: req.query.id
        }
      });

      return res.status(httpStatus.ok).json(result);
    } catch (e) {
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  },
};
