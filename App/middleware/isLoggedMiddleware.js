const models = require("../database/models");

module.exports = async (req, res, next) => {
	try {
		let id = models.Users.getIdFromToken(req);
		console.log(id);
		if (id == null) {
			next()
		}
		const user = await models.Users.findOne({
			where: { id:  id},
			attributes: ['id']
		});
		if (user == null) {
			next()
		} else {
			throw 'redirect';
		}
	} catch (err) {
		res.redirect('/auth/home');
	}
}