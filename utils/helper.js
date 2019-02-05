const config = require('./../config');
const request = require('request-promise');
const logger = require('./logger');
const moment = require('moment');

module.exports = {
  sendSms: async (messageData) => {
    try {
      const authToken = await module.exports.getAuthToken();
      if (!authToken) {
        return false;
      }

      const checkHeader = {
        'Content-Type': 'application/json',
        'Request-id': '1234',
        Authorization: JSON.parse(authToken).identityToken
      };

      const parameters = {
        phoneNumber: `+${messageData.destination}`,
        message: messageData.content,
      };

      const options = {
        url: `${config.get('COE_API_HOST')}/api/p2psmsservice/send/message`,
        method: 'POST',
        headers: checkHeader,
        resolveWithFullResponse: true,
        body: parameters,
        json: true
      };

      logger.info(`SEND REQUEST SEND SMS TO COE : ${JSON.stringify(parameters, null, 2)}`);

      return await request(options);
    } catch (e) {
      return false;
    }
  },

  getAuthToken: async () => {
    try {
      const basicAuthToken = Buffer.from(`${config.get('COGNITO_API_BASIC_AUTH_USER')}:${config.get('COGNITO_API_BASIC_AUTH_PASS')}`).toString('base64');
      const options = {
        url: `${config.get('COGNITO_API_HOST')}/token`,
        method: 'GET',
        headers: {
          Authorization: `Basic ${basicAuthToken}`
        }
      };

      return await request(options);
    } catch (e) {
      return false;
    }
  },

  getDate: async () => {
    const date = new Date();
    const format = moment(date).add(7, 'hours');
    return format;
  }
};
