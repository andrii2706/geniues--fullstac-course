import mongoose from 'mongoose';
import { secret } from './secret.js';

const URI = `mongodb+srv://${secret.DB_USERNAME}:${secret.DB_PASSWORD}@${secret.DB_CLUSTER}/${secret.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

export async function conectDB() {
    try {
        await mongoose
            .connect(URI)
            .then(() => console.log('Mongo connected'))
            .catch((err) => console.error(err));
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
