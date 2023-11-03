const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const app = express();

//* base de datos
dbConnection();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//* rutas
app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/events', require('./routes/events_routes'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Servidor corriendo en puerto ${port}`);
});
