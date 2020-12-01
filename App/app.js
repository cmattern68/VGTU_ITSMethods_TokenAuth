const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter')

const app = express();

app.use(cors())

app.use('/api/auth', authRouter);
module.exports = app;
