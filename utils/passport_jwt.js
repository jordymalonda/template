const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../config');
const User = require('../models/user');

const { ExtractJwt, Strategy } = passportJWT;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('JWT_SECRET')
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  const user = User.findOne({
    where: {
      id: jwtPayload.id,
      email: jwtPayload.email
      // deleted: null
    }
  });

  if (user) {
    next(null, {
      id: jwtPayload.id,
      fullname: jwtPayload.fullname,
      email: jwtPayload.email
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = passport;
