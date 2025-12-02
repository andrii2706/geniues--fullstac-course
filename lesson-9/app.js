import express from 'express';
import bodyParser from 'body-parser';
import { conectDB } from './config/db.js';

import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';

const app = express();
const port = 3000;
//db connect

conectDB();

//middleware
app.use(bodyParser.json());

app.use('/api', authRouter);
app.use('/api', taskRouter);
app.listen(port, () => {
    console.log(`Server works on ${port}`);
});
