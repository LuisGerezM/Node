/*
  Rutas de eventos
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields_validator_middleware');
const { jwtValidator } = require('../middlewares/jwt_validator_middleware');
const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/events_controller');
const { isDate } = require('../helpers/isDate_helper');

const router = Router();

router.use(jwtValidator);

router.get('/', getEvents);

router.post(
	'/',
	[
		check('title', 'El título es obligatorio').not().isEmpty(),
		check('start', 'Fecha inicio es obligatoria').custom(isDate),
		check('end', 'Fecha finalización es obligatoria').custom(isDate),
		fieldsValidator,
	],
	createEvent,
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
