import { createServer } from 'http';
import expressApp from './express.config.js';

const httpServer = createServer(expressApp);

export default httpServer;
