import dotenv from 'dotenv';
import app from './app';
import './models/Video';
import './models/Comment';

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
