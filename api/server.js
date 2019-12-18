const express = require('express');
const userRouter = require('../users/userRouter')
const authRouter = require('../auth/authRouter')
const server = express();

const sessions = require("express-session"); // <<<<< install express-session
const KnexSessionStore = require("connect-session-knex")(sessions); // to store sessions in database
const knex = require('./dbConfig')
const sessionConfiguration = {
    // session storage options
    name: "chocolatechip", // default would be sid
    secret: "keep it secret, keep it safe!", // used for encryption (must be an environment variable)
    saveUninitialized: true, // has implications with GDPR laws
    resave: false,
  
    // how to store the sessions
    store: new KnexSessionStore({
      // DO NOT FORGET THE new KEYWORD
      knex, // imported from dbConfig.js
      createtable: true,
  
      // optional
      clearInterval: 1000 * 60 * 10, // defaults to 6000
      sidfieldname: "sid",
      tablename: "sessions",
    }),
  
    // cookie options
    cookie: {
      maxAge: 1000 * 60 * 10, // session will be good for 10 minutes in milliseconds
      secure: false, // if false the cookie es sent over http, if true only sent over https
      httpOnly: true, // if true JS cannot access the cookie
    },
  };




server.use(express.json())
server.use(sessions(sessionConfiguration)); // add a req.session object

server.use('/user', userRouter);
server.use('/auth', authRouter);
module.exports = server;
