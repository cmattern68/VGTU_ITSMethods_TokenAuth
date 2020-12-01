const model = require("../database/models/");
const validationResult = require('express-validator').validationResult;
const { v4: uuidv4 } = require('uuid');
const randomToken = require('crypto').randomBytes;
const argon2 = require('@phc/argon2');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.log = (req, res) => {
	return res.render('login');
}

exports.login = (req, res) =>
{
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.render('login', { errors: errors.array() });

	model.Users.findOne({
		where: { email: req.body.email },
		attributes: ['id']
	}).then(val => {
		var privateKey = fs.readFileSync( path.dirname(require.main.filename) + '/RSA/jwtRS256.key');
		const token = jwt.sign({ userId: val.id }, privateKey, { expiresIn: '24h',  algorithm: 'RS256' });
		res.cookie('token', token, {maxAge: 60000}).redirect('/auth/home');
	}).catch(err => {
		return res.render('login', { error: "Une erreur est survenue. Veuillez rééssayer plus tard." });
	});
}

exports.home = (req, res) => {
	const id = model.Users.getIdFromToken(req);
	model.Users.findOne({
		where: { id:  id},
	}).then(user => {
		return res.render('home', { user: user, token: req.cookies.token});
	}).catch(err => {
		return res.render('home');
	});
}