'use strict';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const UserDAO = require('./Models/User');

// Set up passport
passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDAO.authentication(username)
            .then(user => {
                return done(null, user);
            }).catch(err => {
                return done(null, false, { message: err.message });
            });
    }
));

/** Serialize User in order to store the id in the session*/
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserDAO.getUserById(id)
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
};

app.use(cors(corsOptions));

app.use(session({
    secret: 'S3cr3tV4lu5_s3ss!0n',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.use("/api", require("./Router/RouterAPI"));

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});