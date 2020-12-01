let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let authController = require('../controllers/authController');
let authValidator = require('../validator/authValidator');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json())

router.post('/login', authValidator.login, authController.login);

module.exports = router;
