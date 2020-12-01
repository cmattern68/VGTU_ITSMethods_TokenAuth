const check = require('express-validator').check;
const model = require("../database/models/");
const argon2 = require('@phc/argon2');
const { v4: uuidv4, validate: validate } = require('uuid');

exports.login = [
  check('email', 'L\'Adresse email est invalide.').isEmail().normalizeEmail().trim().escape(),
  check('password', 'Le mot de passe est invalide.').trim().escape().custom((val, {req}) => loginMatch(val, req))
];

loginMatch = async (val, req) => {
  const user = await model.Users.findOne({
    where: { email: req.body.email },
    attributes: ['password']
  });
  console.log(req);
  if (user === null)
    throw new Error("Le nom d'utilisateur et le mot de passe ne correspondent pas 1.");
  else if (user.password === null)
    throw new Error("Votre compte n'est pas activé.");
  let isCorrect = await argon2.verify(user.password, req.body.password);
  if (!isCorrect)
    throw new Error("Le nom d'utilisateur et le mot de passe ne correspondent pas 2.");
  return val;
}