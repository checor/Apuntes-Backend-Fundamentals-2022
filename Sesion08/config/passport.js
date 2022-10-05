const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(email, password, done) {
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, {errors: {'email o contraseña': 'equivocados'}})
        }
        return done(null, user);
    }).catch(done);
}));

module.exports = passport;