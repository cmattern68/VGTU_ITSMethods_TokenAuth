const models = require("../database/models");

module.exports = async (req, res, next) => {
  try {
    let id = models.Users.getIdFromToken(req);
    if (id == null) {
      throw 'Unauthorized.';
    }
    const user = await models.Users.findOne({
      where: { id:  id},
      attributes: ['id']
    });
    if (user == null) {
      throw 'Unauthorized.';
    } else {
      next();
    }
  } catch (err) {
    res.status(401).render('home', {
      error: err
    });
  }
}