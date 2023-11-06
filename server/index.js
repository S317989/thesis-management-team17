'use strict';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

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