const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');
const passport = require('passport');
const winston = require('../config/winston');


passport.use(new LocalStrategy({},
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username and password.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect username and password.'
        });
      }
      return done(null, user);
    });
  }
));

// At a minimum, you must pass these options (see note after this code snippet for more)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// The JWT payload is passed into the verify callback
passport.use(new JwtStrategy(options, function (jwt_payload, done) {
  winston.info('jwtPayload: ' + JSON.stringify(jwt_payload));
  done(null, jwt_payload);
}));





