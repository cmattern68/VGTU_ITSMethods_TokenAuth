const models = require("../database/models");

module.exports = async (req, res, next) => {
  try {
    let id = models.Users.getIdFromToken(req.headers.authorization);
    if (id == null) {
      throw 'Vous n\'êtes pas autorisé a accéder à cette page.';
    }
    const user = await models.Users.findOne({
      where: { id:  id},
      attributes: ['id']
    });
    if (user == null) {
      res.status(401).json({
        error: 'Requête invalide.'
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: 'Requête invalide.'
    });
  }
}