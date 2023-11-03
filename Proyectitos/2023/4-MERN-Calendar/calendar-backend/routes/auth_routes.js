/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth_controller');
const { fieldsValidator } = require('../middlewares/fields_validator_middleware');
const { jwtValidator } = require('../middlewares/jwt_validator_middleware');

const router = Router();

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		fieldsValidator,
	],
	loginUser,
);

router.post(
	'/new',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		fieldsValidator,
	],
	createUser,
);

router.get('/renew', jwtValidator, revalidateToken);

module.exports = router;
