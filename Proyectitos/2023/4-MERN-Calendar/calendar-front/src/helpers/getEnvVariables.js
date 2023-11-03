export const getEnvVariables = () => {
	const env = import.meta.env;
	console.log('ENV', { env });
	return {
		...env,
	};
};
