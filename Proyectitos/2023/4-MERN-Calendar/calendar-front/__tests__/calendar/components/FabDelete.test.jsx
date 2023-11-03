import { fireEvent, render, screen } from '@testing-library/react';

import { FabDelete } from '@/calendar/components/FabDelete';

import { useCalendarStore } from '@/hooks/useCalendarStore';

jest.mock('@/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {
	const mockStartDeletingEvent = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Debe mostrar el componente correctamente', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: false,
		});

		render(<FabDelete />);

		const btn = screen.getByLabelText('btn-delete');

		expect(btn.classList).toContain('btn');
		expect(btn.classList).toContain('btn-danger');
		expect(btn.classList).toContain('fab-danger');
		expect(btn.style.display).toBe('none');
	});

	test('Debe mostrar el boton si hay un evento activo', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: true,
		});

		render(<FabDelete />);

		const btn = screen.getByLabelText('btn-delete');

		expect(btn.classList).toContain('btn');
		expect(btn.classList).toContain('btn-danger');
		expect(btn.classList).toContain('fab-danger');
		expect(btn.style.display).toBe('');
	});

	test('Debe llamar startDeleteEvent si hay evento activo y se da click', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: true,
			startDeleteEvent: mockStartDeletingEvent,
		});

		render(<FabDelete />);

		const btn = screen.getByLabelText('btn-delete');

		fireEvent.click(btn);

		expect(mockStartDeletingEvent).toHaveBeenCalled();
	});
});
