const express = require('express');
const userRouter = require('../users/userRouter')
const authRouter = require('../auth/authRouter')
const server = express();

server.use(express.json())

server.use('/user', userRouter);
server.use('/auth', authRouter);
module.exports = server;
