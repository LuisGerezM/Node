const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req = response, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'El token es necesario.',
		});
	}

	try {
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.uid = uid;
		req.name = name;

		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token no válido.',
		});
	}
};

module.exports = {
	jwtValidator,
};
