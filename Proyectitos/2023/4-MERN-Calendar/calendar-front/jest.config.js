export default {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: [
		'<rootDir>/.jest/setup-tests.js',
		'<rootDir>/__tests__/__mocks__/enviroment.mock.js'
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
		// '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
		'\\.(css|less|sass|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.js'
	},
	testMatch: [
		'**/__test__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test|tests).[tj]s?(x)'
	]
};
