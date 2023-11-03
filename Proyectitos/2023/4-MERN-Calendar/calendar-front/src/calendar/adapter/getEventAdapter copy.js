export const getEventAdapter = data => {
	return {
		ok: data.ok,
		msg: data.msg,
		events: data.events.map(event => {
			return {
				title: event.title,
				notes: event.notes,
				start: event.start,
				end: event.end,
				user: {
					_id: event.user._id,
					name: event.user.name,
					email: event.user.email,
				},
				id: event.id,
			};
		}),
	};
};
