let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
const authController = require('../controllers/authController');
const authValidator = require('../validator/authValidator');
const authMiddleware = require('../middleware/authMiddleware');
const isLoggedMiddleware = require('../middleware/isLoggedMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json())

router.get('/login', [isLoggedMiddleware] , authController.log);
router.post('/login', authValidator.login, [isLoggedMiddleware], authController.login);
router.get('/home', [authMiddleware], authController.home);

module.exports = router;
