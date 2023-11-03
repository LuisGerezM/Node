import { authSlice, clearErrorMessage, onLogin, onLogout } from '@/store/auth/authSlice';

import { authenticatedState, initialState } from '../../__fixtures__/authStates';
import { testUserCredentials } from '../../__fixtures__/testUser';

describe('Pruebas en authSlice', () => {
	test('Debe regresar el estado inicial ', () => {
		console.log(authSlice.getInitialState());
		expect(authSlice.getInitialState()).toEqual(initialState);
	});

	test('Debe realizar un login', () => {
		const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

		expect(state).toEqual({
			status: 'authenticated',
			user: testUserCredentials,
			errorMessage: undefined,
		});
	});

	test('Debe realizar el logout', () => {
		const state = authSlice.reducer(authenticatedState, onLogout());

		expect(state).toEqual({
			status: 'not-authenticated',
			user: {},
			errorMessage: undefined,
		});
	});

	test('Debe realizar el logout con mensaje de error', () => {
		const errorMsg = 'Credenciales no validas';
		const state = authSlice.reducer(authenticatedState, onLogout(errorMsg));

		expect(state).toEqual({
			status: 'not-authenticated',
			user: {},
			errorMessage: errorMsg,
		});
	});

	test('Debe limpiar el mensaje de error', () => {
		const errorMsg = 'Credenciales no validas';
		const state = authSlice.reducer(authenticatedState, onLogout(errorMsg));
		const newState = authSlice.reducer(state, clearErrorMessage());

		expect(newState.errorMessage).toBe(undefined);
	});
});
