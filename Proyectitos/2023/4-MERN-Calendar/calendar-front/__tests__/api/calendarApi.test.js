import calendarApi from '@/api/calendarApi';

describe('Pruebas en calendarApi', () => {
	test('Debe tener la configuracion por defecto', () => {
		expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
	});

	test('Debe x-token en el header de todas las peticiones', async () => {
		const token = 'ABC-123-XYZ';
		try {
			localStorage.setItem('token', token);
			const response = await calendarApi.get('/auth');
			expect(response.config.headers['x-token']).toBe(token);
		} catch (error) {
			expect(error.config.headers['x-token']).toBe(token);
		}
	});
});
