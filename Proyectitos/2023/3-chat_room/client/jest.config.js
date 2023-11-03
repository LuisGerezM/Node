export default {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: [
		'<rootDir>/.jest/setup-tests.js',
		'<rootDir>/.jest/mocks/enviroment.mock.js'
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/.jest/mocks/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy'
	},
	testMatch: [
		'**/__test__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test|tests).[tj]s?(x)'
	]
};
