const { httpStatus } = require('../../../configs/codes');
const logger = require('../../../utils/logger');
// const config = require('../../config');


const callbackController = {
  get: async (req, res) => {
    // req.checkQuery({
    //   from: { notEmpty: true, errorMessage: 'from field is required' },
    //   to: { notEmpty: true, errorMessage: 'to field is required' },
    // });

    // const errors = req.validationErrors();
    // if (errors) {
    //   return res.status(httpStatus.badRequest).json({
    //     status: httpStatus.badRequest,
    //     success: false,
    //     message: errors
    //   });
    // }

    try {
      const profiler = logger.startTimer();
      const { params, query } = req;
      profiler.done(`CALLBACK NUSASMS: ${JSON.stringify({ params, query }, null, 2)}`);

      return res.sendStatus(httpStatus.ok);
    } catch (e) {
      logger.error(`ERROR CALLBACK NUSASMS: ${JSON.stringify(e.message, null, 2)}`);
      return res.status(e.statusCode || httpStatus.internalServerError).json({
        status: e.statusCode || httpStatus.internalServerError,
        success: false,
        message: (e.error && e.error.message) || e.message
      });
    }
  }
};

module.exports = (router) => {
  router.get('/', callbackController.get);
};
