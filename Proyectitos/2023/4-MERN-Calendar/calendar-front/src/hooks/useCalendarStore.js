import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '@/store';
import { calendarApi } from '@/api';
import { convertsEventsToDateEvents } from '@/helpers';
import { userFeedbackMsg } from '@/helpers/userFeedbackMsg';
import { createEventAdapter } from '@/calendar/adapter/createEventAdapter';
import { getEventAdapter } from '@/calendar/adapter/getEventAdapter copy';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector(state => state.calendar);
	const { user } = useSelector(state => state.auth);

	const setActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async calendarEvent => {
		try {
			if (calendarEvent.id) {
				const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

				if (!data.ok) throw new Error(JSON.stringify(` === update ===\n ${data}`));

				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}

			const { data } = await calendarApi.post('/events', calendarEvent);

			if (!data.ok) throw new Error(JSON.stringify(` === create ===\n ${data}`));

			const dataCreateEvent = createEventAdapter(data);
			dispatch(onAddNewEvent({ ...calendarEvent, id: dataCreateEvent.event.id, user }));
		} catch (error) {
			console.error('error - startSavingEvent', error?.response?.data?.msg || error);
			userFeedbackMsg({
				title: 'Error al guardar',
				subTitle:
					error?.response?.data?.msg ||
					'Ocurrió un error al intentar guardar el evento. Por favor intente más tarde o comuniquese con el administrador',
				icon: 'error',
			});
		}
	};

	const startDeleteEvent = async () => {
		try {
			const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);

			if (!data.ok) throw new Error(JSON.stringify(data));

			dispatch(onDeleteEvent());
		} catch (error) {
			console.error('error - startDeleteEvent', error?.response?.data?.msg || error);
			userFeedbackMsg({
				title: 'Error al eliminar',
				subTitle:
					error?.response?.data?.msg ||
					'Ocurrió un error al intentar eliminar el evento. Por favor intente más tarde o comuniquese con el administrador',
				icon: 'error',
			});
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');

			if (!data.ok) throw new Error(JSON.stringify(data));

			const dataGetEvent = getEventAdapter(data);

			const events = convertsEventsToDateEvents(dataGetEvent.events);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('error - startLoadingEvents', error);
			console.error('Error cargando eventos');
		}
	};

	return {
		activeEvent,
		events,
		hasEventSelected: !!activeEvent,

		setActiveEvent,
		startDeleteEvent,
		startLoadingEvents,
		startSavingEvent,
	};
};
