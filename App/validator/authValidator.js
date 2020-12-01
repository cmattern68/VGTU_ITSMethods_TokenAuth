const check = require('express-validator').check;
const model = require("../database/models/");
const argon2 = require('@phc/argon2');
const { v4: uuidv4, validate: validate } = require('uuid');

exports.login = [
  check('email', 'Email address is not valid.').isEmail().normalizeEmail().trim().escape(),
  check('password', 'Password is not valid.').trim().escape().custom((val, {req}) => loginMatch(val, req))
];

loginMatch = async (val, req) => {
  const user = await model.Users.findOne({
    where: { email: req.body.email },
    attributes: ['password']
  });
  if (user === null)
    throw new Error("Username and password does not match.");
  let isCorrect = await argon2.verify(user.password, req.body.password);
  if (!isCorrect)
    throw new Error("Username and password does not match.");
  return val;
}