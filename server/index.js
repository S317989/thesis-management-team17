'use strict';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SamlStrategy = require('passport-saml').Strategy;
const auth0Strategy = require('passport-auth0');
const session = require('express-session');
const UsersServices = require('./Services/Users');
const path = require('path');
const fs = require('fs');

passport.use(new auth0Strategy({
    domain: 'thesis-management-team17.eu.auth0.com',
    clientID: 'fgIV2JAWJdjmSQPXK9GrtR4FgFomIqLS',
    clientSecret: 'yJX_spk-i03YxHbY_ggTZAjz17Zk3tnNBup3SiLY3RYQn52LkgWq1a6QTaOEcfUa',
    callbackURL: 'http://localhost:3000/login/callback',
    scope: 'openid profile',
    credentials: true
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    UsersServices.getUserById(user.nickname.substring(1, user.length))
        .then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
});

// Init express
const app = express();
const port = 3000;

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    origin: true
};

app.use(cors(corsOptions));

app.use(session({
    secret: 'S3cr3tV4lu5_s3ss!0n',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        _expires: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./Router/RouterAPI"));

app.get('/login', (req, res, next) => {
    !req.isAuthenticated() ?
        passport.authenticate('auth0', function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.redirect('/login');
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        }
        )(req, res, next)
        : res.status(401).json({ message: 'Forbidden' });
});

app.get('/login/callback', (req, res, next) => {
    !req.isAuthenticated() ?
        passport.authenticate('auth0', function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.redirect('/login');
            req.logIn(user, async function (err) {
                if (err) { return next(err); }

                const userData = await UsersServices.getUserById(user.nickname.substring(1, user.length));

                if (userData === undefined)
                    return next(err);

                const redirectURL = "http://localhost:5173";
                return res.redirect(redirectURL);
            });
        }
        )(req, res, next) :
        res.status(401).json({ message: 'Forbidden' });
}
);

app.get('/logout', (req, res) => {
    req.isAuthenticated() ?
        req.logOut(res, function (err) {
            if (err) { return next(err); }

            const redirectURL = "http://localhost:5173";
            return res.redirect(redirectURL);
        })
        : res.status(401).json({ message: 'Forbidden' });
});

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});