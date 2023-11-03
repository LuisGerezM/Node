const { response } = require('express');
const Usuario = require('../models/User_model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt_helper');
const { failResponses } = require('../helpers/fail_responses_helper');

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let findUser = await Usuario.findOne({ email });

		if (!findUser) {
			return failResponses({
				res,
				status: 404,
				location: 'login-user',
				msg: 4,
			});
		}

		const validPassword = bcrypt.compareSync(password, findUser.password);

		if (!validPassword) {
			return failResponses({
				res,
				status: 404,
				location: 'login-user',
				msg: 4,
			});
		}

		const token = await generateJWT({ uid: findUser.id, name: findUser.name });

		res.status(201).json({
			ok: true,
			msg: 'login',
			uid: findUser.id,
			name: findUser.name,
			token,
		});
	} catch (error) {
		console.log('\x1b[31m', error);
		failResponses({
			res,
			status: 500,
			location: 'get-event',
			msg: 1,
		});
	}
};

const createUser = async (req, res = response) => {
	try {
		const { email, password } = req.body;

		let findUser = await Usuario.findOne({ email });

		if (findUser) {
			return failResponses({
				res,
				status: 404,
				location: 'create-user',
				msg: 5,
			});
		}

		const user = new Usuario(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await generateJWT({ uid: user.id, name: user.name });

		res.status(201).json({
			ok: true,
			msg: 'registro',
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log('\x1b[31m', error);
		failResponses({
			res,
			status: 500,
			location: 'get-event',
			msg: 1,
		});
	}
};

const revalidateToken = async (req, res = response) => {
	const uid = req.uid;
	const name = req.name;

	const token = await generateJWT({ uid, name });

	res.json({
		ok: true,
		msg: 'renew',
		token,
		uid,
		name,
	});
};

module.exports = {
	createUser,
	loginUser,
	revalidateToken,
};
