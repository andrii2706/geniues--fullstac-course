import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import { conectDB } from './config/db.js';

import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import swaggerSpec from './config/swagger.js';

const app = express();
const port = 3000;
//db connect

conectDB();

//middleware
app.use(bodyParser.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', authRouter);
app.use('/api', taskRouter);
app.listen(port, () => {
    console.log(`Server works on ${port}`);
});
