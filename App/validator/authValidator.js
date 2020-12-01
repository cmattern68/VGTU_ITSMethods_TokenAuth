const check = require('express-validator').check;
const UserModel = require("../database/models/users.js");
const argon2 = require('@phc/argon2');
const { v4: uuidv4, validate: validate } = require('uuid');

exports.login = [
  check('email', 'L\'Adresse email est invalide.').isEmail().normalizeEmail().trim().escape(),
  check('password', 'Le mot de passe est invalide.').trim().escape().custom((val, {req}) => loginMatch(val, req))
];

loginMatch = async (val, req) => {
  const user = await UserModel.findOne({
    where: { email: req.body.email },
    attributes: ['password', 'activate']
  });
  if (user === null)
    throw new Error("Le nom d'utilisateur et le mot de passe ne correspondent pas.");
  else if (!user.activate || user.password === null)
    throw new Error("Votre compte n'est pas activé.");
  let isCorrect = await argon2.verify(user.password, req.body.password);
  if (!isCorrect)
    throw new Error("Le nom d'utilisateur et le mot de passe ne correspondent pas.");
  return val;
}