const message = {
	1: 'Por favor comunicate con el administrador.',
	2: 'Evento no existe con ese ID.',
	3: 'No tiene privilegio en este evento.',
	4: 'Usuario y/o contraseña incorrecto/s.',
	5: 'Un usuario ya existe con ese correo.',
};

const failResponses = ({ res, status, location, msg }) => {
	return res.status(status).json({
		ok: false,
		location: location,
		msg: message[msg],
	});
};

module.exports = {
	failResponses,
};
