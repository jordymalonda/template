// const { httpStatus, errorCodes } = require('./../configs/codes');
const config = require('../config');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

const adminCredential = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.get('DB_HOST_FIREBASE')
};
admin.initializeApp(adminCredential);

const authService = admin.auth();

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const idToken = req.headers.authorization;

    // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
    let decodedIdToken;

    try {
      decodedIdToken = await authService.verifyIdToken(idToken);

      req.user = decodedIdToken;
      next();
    } catch (e) {
      next(e.message, false);
    }
  }
};
