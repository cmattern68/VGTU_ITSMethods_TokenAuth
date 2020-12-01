'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  Users.getIdFromToken = function(token) {
    try {
      if (token == undefined || token.split(' ')[1] == undefined)
        return null;
      token = token.split(' ')[1];
      const publicKey = fs.readFileSync(path.dirname(require.main.filename) + '/RSA/jwtRS256.key.pub');
      const decodedToken = jwt.verify(token, publicKey);
      return decodedToken.userId;
    } catch(err) {
      return null;
    }
  }
  return Users;
};