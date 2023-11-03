export const createEventAdapter = data => ({
	ok: data.ok,
	msg: data.msg,
	event: {
		title: data.event.title,
		notes: data.event.notes,
		start: data.event.start,
		end: data.event.end,
		user: data.event.user,
		id: data.event.id,
	},
});
