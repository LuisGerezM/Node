const { response } = require('express');
const Event = require('../models/Event_model');
const { failResponses } = require('../helpers/fail_responses_helper');

const getEvents = async (req, res = response) => {
	try {
		const events = await Event.find().populate('user', 'name email');

		return res.status(200).json({
			ok: true,
			msg: 'getEvents',
			events,
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

const createEvent = async (req, res = response) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;
		const savedEvent = await event.save();

		return res.status(200).json({
			ok: true,
			msg: 'createEvent',
			event: savedEvent,
		});
	} catch (error) {
		console.log('\x1b[31m', error);

		failResponses({
			res,
			status: 500,
			location: 'create-event',
			msg: 1,
		});
	}
};

const updateEvent = async (req, res = response) => {
	const eventID = req.params.id;
	const uid = req.uid;
	try {
		const event = await Event.findById(eventID);

		if (!event) {
			return failResponses({
				res,
				status: 404,
				location: 'update-event',
				msg: 2,
			});
		}

		if (event.user.toString() !== uid) {
			return failResponses({
				res,
				status: 401,
				location: 'update-event',
				msg: 3,
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};

		const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });

		return res.status(200).json({
			ok: true,
			msg: 'updateEvent',
			event: updatedEvent,
		});
	} catch (error) {
		console.log('\x1b[31m', error);

		failResponses({
			res,
			status: 500,
			location: 'update-event',
			msg: 1,
		});
	}
};

const deleteEvent = async (req, res = response) => {
	const eventID = req.params.id;
	const uid = req.uid;
	try {
		const event = await Event.findById(eventID);

		if (!event) {
			return failResponses({
				res,
				status: 401,
				location: 'delete-event',
				msg: 2,
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				location: 'delete-event',
				msg: 3,
			});
		}

		const updatedEvent = await Event.findByIdAndDelete(eventID);

		return res.status(200).json({
			ok: true,
			msg: 'deleteEvent',
		});
	} catch (error) {
		console.log('\x1b[31m', error);

		failResponses({
			res,
			status: 500,
			location: 'delete-event',
			msg: 1,
		});
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
