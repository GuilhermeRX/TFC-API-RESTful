import 'dotenv/config';
import { App } from './app';

const PORT = process.env.PORT || 3003;

new App().start(PORT);
