export const events = [
	{
		id: 1,
		title: 'Titulo test',
		notes: 'Nota test',
		start: new Date('2023-11-01 20:00:00'),
		end: new Date('2023-11-01 22:00:00'),
	},
	{
		id: 2,
		title: 'Titulo test 2',
		notes: 'Nota test 2',
		start: new Date('2023-11-26 20:00:00'),
		end: new Date('2023-11-26 22:00:00'),
	},
];

export const initialState = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarWithEventsState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: null,
};

export const calendarWithActiveEventState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: { ...events[0] },
};
