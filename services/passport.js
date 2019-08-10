const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const keys = require('../config/keys');
const FacebookStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile._json.email })
    .then(existingUser => {
        if(existingUser) {
            existingUser.update({ googleId: profile.id})
            .then((user) => user.save())
            return done(null, existingUser);
        }
        new User({ googleId: profile.id, 
                    email: profile._json.email,
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    profilePhoto: profile._json.picture
                })
        .save()
        .then(user => done(null, user));
    }); 
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => {
    User.findOne({ email: profile._json.email})
    .then(existingUser => {
        if(existingUser) {
            existingUser.update({ facebookId: profile.id})
            .then((user) => user.save())
            return cb(null, existingUser);
        }
        new User({ facebookId: profile.id,
                    email: profile._json.value
                })
        .save()
        .then(user => cb(null, user));
    });
}));

passport.use(new InstagramStrategy({
    clientID: keys.instagramClientID,
    clientSecret: keys.linkedInClientSecret,
    callbackURL: "/auth/instagram/callback"
}, (accessToken, refreshToken, profile, done) => {
    console.log("User", profile);
}));