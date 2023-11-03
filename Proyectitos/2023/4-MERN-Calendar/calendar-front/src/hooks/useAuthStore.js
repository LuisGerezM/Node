import { useDispatch, useSelector } from 'react-redux';

import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '@/store';

import { calendarApi } from '@/api';
import { authCheckTokenAdapter, authLoginAdapter } from '@/auth/adapters';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth', { email, password });

			if (!data.ok) throw new Error(JSON.stringify(data));

			let dataLogin = authLoginAdapter(data);

			localStorage.setItem('token', dataLogin.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: dataLogin.name, uid: dataLogin.uid }));
		} catch (error) {
			console.error('error - startLogin: ', error?.response?.data || error);

			const errorMessage = error?.response?.data
				? JSON.stringify(error?.response?.data)
				: 'Credenciales inconrrectas';

			dispatch(onLogout(errorMessage)); 

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth/new', { name, email, password });

			if (!data.ok) throw new Error(JSON.stringify(data));

			let dataRegister = authLoginAdapter(data);

			localStorage.setItem('token', dataRegister.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: dataRegister.name, uid: dataRegister.uid }));
		} catch (error) {
			console.error('error - startRegister:', error.response.data);

			dispatch(onLogout(error.response.data?.msg || 'Ocurrió un error en el registro.'));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(onLogoutCalendar());
			dispatch(onLogout());
			return;
		}

		try {
			const { data } = await calendarApi.get('auth/renew');

			if (!data.ok) throw new Error(JSON.stringify(data));

			const dataCheckToken = authCheckTokenAdapter(data);

			localStorage.setItem('token', dataCheckToken.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: dataCheckToken.name, uid: dataCheckToken.uid }));
		} catch (error) {
			console.error('error - checkAuthToken: ', error?.response?.data || error);
			localStorage.removeItem('token');
			localStorage.removeItem('token-init-date');
			dispatch(onLogout());
			dispatch(onLogoutCalendar());
		}
	};

	const startLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('token-init-date');
		dispatch(onLogout());
		dispatch(onLogoutCalendar());
	};

	return {
		status,
		user,
		errorMessage,
		
		checkAuthToken,
		startLogin,
		startLogout,
		startRegister,
	};
};
