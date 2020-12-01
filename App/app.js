const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter')
const path = require('path');
var cookieParser = require('cookie-parser')

const app = express();

app.use(cors())
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs')
app.use(cookieParser())

app.use('/auth', authRouter);
module.exports = app;
