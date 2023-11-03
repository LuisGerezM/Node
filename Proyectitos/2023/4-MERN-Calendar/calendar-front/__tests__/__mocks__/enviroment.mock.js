require('dotenv').config({
	path: '.env.test'
});

jest.mock('@/helpers/getEnvVariables', () => ({
	getEnvVariables: () => ({ ...process.env })
}));
