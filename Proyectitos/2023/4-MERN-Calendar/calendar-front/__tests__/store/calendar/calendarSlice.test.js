import { calendarSlice } from '@/store/calendar/calendarSlice';
import {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
} from '@/store/calendar/calendarSlice';

import {
	calendarWithActiveEventState,
	calendarWithEventsState,
	events,
	initialState,
} from '../../__fixtures__/calendarStates';

describe('Pruebas en calendarSlice', () => {
	test('Debe regresar el estado por defecto', () => {
		const state = calendarSlice.getInitialState();

		expect(state).toEqual(initialState);
	});

	test('onSetActiveEvent debe activar el evento', () => {
		const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));

		expect(state.activeEvent).toEqual(events[0]);
	});

	test('onAddNewEvent debe agregar el evento', () => {
		const newEvent = {
			id: 3,
			title: 'Titulo test 3',
			notes: 'Nota test 3',
			start: new Date('2023-11-01 20:00:00'),
			end: new Date('2023-11-01 22:00:00'),
		};

		const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

		expect(state.events).toEqual([...events, newEvent]);
	});

	test('onAddNewEvent debe actualizar el evento', () => {
		const updatedEvent = {
			id: 1,
			title: 'Titulo test actualizado',
			notes: 'Nota test actualizada',
			start: new Date('2023-11-01 20:00:00'),
			end: new Date('2023-11-01 22:00:00'),
		};

		const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));

		expect(state.events).toContain(updatedEvent);
	});

	test('onDeleteEvent debe borrar evento activo', () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onDeleteEvent(calendarWithActiveEventState),
		);

		expect(state.activeEvent).toBe(null);
		expect(state.events).not.toContain(events[0]);
	});

	test('onLoadEvents debe establecer los evento', () => {
		const state = calendarSlice.reducer(initialState, onLoadEvents(events));

		expect(state.isLoadingEvents).toBeFalsy();
		expect(state.events).toEqual(events);
	});

	test('onLoadEvents debe establecer los evento y los eventos no deben duplicarse', () => {
		const state = calendarSlice.reducer(initialState, onLoadEvents(events));
		expect(state.isLoadingEvents).toBeFalsy();
		expect(state.events).toEqual(events);

		const newState = calendarSlice.reducer(state, onLoadEvents(events));
		expect(state.events.length).toBe(events.length);
	});

	test('onLogoutCalendar debe limpiar el estado', () => {
		const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
		expect(state).toEqual(initialState);
	});
});
