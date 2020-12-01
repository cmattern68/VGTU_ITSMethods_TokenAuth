'use strict';

let { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      // Les mots de passe sont azertyuiop
      { id: uuidv4(), email: "exemple@exemple.com", password: "$argon2id$v=19$t=3,m=4096,p=1$tNDAzaGdt1nQFvY+mVLpDw$HuMsFO1bZgK8OnmmWoBY7vrjsU4hS4RYD6DpaY1HnuY", createdAt: new Date(), updatedAt: new Date() },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),

};