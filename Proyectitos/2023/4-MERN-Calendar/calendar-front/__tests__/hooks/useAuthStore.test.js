import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import calendarApi from '@/api/calendarApi';
import { authSlice } from '@/store/auth/authSlice';
import { useAuthStore } from '@/hooks/useAuthStore';
import { initialState, notAuthenticatedState } from '../__fixtures__/authStates';
import { testUserCredentials } from '../__fixtures__/testUser';

const getAuthStoreMock = initialState => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
		},
		preloadedState: {
			auth: { ...initialState },
		},
	});
};

describe('Pruebas en useAuthStore', () => {
	beforeEach(() => {
		localStorage.removeItem('token');
		localStorage.removeItem('token-init-date');
	});
	test('useAuthStore debe regresar los valores por defecto', () => {
		const mockStore = getAuthStoreMock(initialState);

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		expect(result.current).toEqual({
			...initialState,
			checkAuthToken: expect.any(Function),
			startLogin: expect.any(Function),
			startLogout: expect.any(Function),
			startRegister: expect.any(Function),
		});
	});

	test('startLogin debe regresar el login correctamente', async () => {
		const mockStore = getAuthStoreMock({ ...notAuthenticatedState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		await act(async () => {
			await result.current.startLogin(testUserCredentials);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
			errorMessage: undefined,
			status: 'authenticated',
		});

		expect({ errorMessage, status, user }).toEqual({
			user: { name: expect.any(String), uid: expect.any(String) },
			errorMessage: undefined,
			status: expect.any(String),
		});

		expect(localStorage.getItem('token')).toEqual(expect.any(String));
		expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
	});

	test('startLogin debe fallar la autenticacion', async () => {
		const mockStore = getAuthStoreMock({ ...notAuthenticatedState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		await act(async () => {
			await result.current.startLogin({ email: 'algo2@mail.com', password: '123456789' });
		});

		const { errorMessage, status, user } = result.current;

		expect(localStorage.getItem('token')).toBe(null);
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: expect.any(String),
			status: 'not-authenticated',
			user: {},
		});

		await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
	});

	test('startRegister debe crear un usuario', async () => {
		const newUser = { email: 'algo@mail.com', password: '123456789', name: 'Test User 2' };

		const mockStore = getAuthStoreMock({ ...notAuthenticatedState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
			data: {
				ok: true,
				uid: '123456',
				name: 'Test User',
				token: 'test-token',
			},
		});

		await act(async () => {
			await result.current.startRegister(newUser);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'authenticated',
			user: { name: 'Test User', uid: '123456' },
		});

		spy.mockRestore();
	});

	test('startRegister debe fallar la creación', async () => {
		const mockStore = getAuthStoreMock({ ...notAuthenticatedState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		await act(async () => {
			await result.current.startRegister(testUserCredentials);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: 'Un usuario ya existe con ese correo.',
			status: 'not-authenticated',
			user: {},
		});

		await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
	});

	test('checkAuthToken debe fallar si no hay token', async () => {
		const mockStore = getAuthStoreMock({ ...initialState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		await act(async () => {
			await result.current.checkAuthToken(testUserCredentials);
		});

		expect(localStorage.getItem('token')).toBe(null);

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({ ...notAuthenticatedState });
	});

	test('checkAuthToken debe autenticar el usuario si hay token', async () => {
		const { data } = await calendarApi.post('/auth', testUserCredentials);
		localStorage.setItem('token', data.token);

		const mockStore = getAuthStoreMock({ ...initialState });

		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		await act(async () => {
			await result.current.checkAuthToken(testUserCredentials);
		});

		expect(localStorage.getItem('token')).not.toBe(null);

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'authenticated',
			user: { name: data.name, uid: data.uid },
		});
	});
});
