import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AppRouter } from '@/router/AppRouter';

import { useAuthStore } from '@/hooks/useAuthStore';

jest.mock('@/hooks/useAuthStore');

jest.mock('@/calendar/pages/CalendarPage', () => ({
	CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe('Pruebas en <AppRouter />', () => {
	const mockCheckAuthToken = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});
	test('Debe mostrar la pantalla de carga y llamar a checkAuthToken', () => {
		useAuthStore.mockReturnValue({
			checkAuthToken: mockCheckAuthToken,
			status: 'checking',
		});

		render(<AppRouter />);

		expect(screen.getByText('Cargando...')).toBeTruthy();
		expect(mockCheckAuthToken).toHaveBeenCalled();
	});

	test('Debe mostrar el login en caso de no estar autenticado', () => {
		useAuthStore.mockReturnValue({
			checkAuthToken: mockCheckAuthToken,
			status: 'not-authenticated',
		});

		const { container } = render(
			<MemoryRouter>
				<AppRouter />
			</MemoryRouter>,
		);

		expect(screen.getByText('Ingreso')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('Debe mostrar el login luego de pasar por el <Navigate to="/auth/login" />', () => {
		useAuthStore.mockReturnValue({
			checkAuthToken: mockCheckAuthToken,
			status: 'not-authenticated',
		});

		const { container } = render(
			<MemoryRouter initialEntries={['/auth2/algo/otra_ruta']}>
				<AppRouter />
			</MemoryRouter>,
		);

		expect(screen.getByText('Ingreso')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('Debe mostrar el calendario si estamos autenticados', () => {
		useAuthStore.mockReturnValue({
			checkAuthToken: mockCheckAuthToken,
			status: 'authenticated',
		});

		render(
			<MemoryRouter>
				<AppRouter />
			</MemoryRouter>,
		);

		expect(screen.getByText('CalendarPage')).toBeTruthy();
	});
});
