import '#Config/env.config.js'; 
import httpServer from '#Config/http.config.js';
import connectDB from '#Config/db.config.js';

const bootstrap = async () => {
    await connectDB(process.env.MONGODB_URL);

    httpServer.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
};

bootstrap();
