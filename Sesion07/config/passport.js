const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

passport.use(new BearerStrategy(function(token, done) {
    const body = jwt.decode(token, {secret});
    User.findOne({where: {username: body.user}}).then(function (user) {
        if (!user) {
            return done(null, false, {errors: {'JWT': 'invalido'}})
        }
        return done(null, user);
    }).catch(done);
}));

module.exports = passport;