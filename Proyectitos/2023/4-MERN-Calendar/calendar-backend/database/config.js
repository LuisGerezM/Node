const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		let dbConnectionString = process.env.DB_CNN;

		dbConnectionString = dbConnectionString.replace(/DB_USER/g, process.env.DB_USER);
		dbConnectionString = dbConnectionString.replace(/DB_PASSWORD/g, process.env.DB_PASSWORD);

		await mongoose.connect(dbConnectionString);

		console.log('\x1b[36m', 'DB Online');
	} catch (error) {
		console.log(error);
		throw new Error('Error al inicializar la BD');
	}
};

module.exports = {
	dbConnection,
};
