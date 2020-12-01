const model = require("../database/models/");
const validationResult = require('express-validator').validationResult;
const { v4: uuidv4 } = require('uuid');
const randomToken = require('crypto').randomBytes;
const argon2 = require('@phc/argon2');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.log = (req, res) => {
	argon2.hash("Azertyuiop1.").then( ret => {
		return res.status(200).json({pass: ret});
		}
	).catch( err => {

		}
	);
}

exports.login = (req, res) =>
{
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(422).json({ error: errors.array()[0].msg });

	model.Users.findOne({
		where: { email: req.body.email },
		attributes: ['id']
	}).then(val => {
		var privateKey = fs.readFileSync( path.dirname(require.main.filename) + '/RSA/jwtRS256.key');
		return res.status(200).json({
			token: jwt.sign(
				{ userId: val.id },
				privateKey,
				{ expiresIn: '24h',  algorithm: 'RS256' }
			)
		});
	}).catch(err => {
		return res.status(422).json({ error: "Une erreur est survenue. Veuillez rééssayer plus tard." });
	});
}