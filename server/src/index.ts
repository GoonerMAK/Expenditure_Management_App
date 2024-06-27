import express from "express";
import cookieParser from 'cookie-parser';

import { categoryRouter } from './routes/category.route.js';
import { financialDataRouter } from './routes/financial-data.route.js';
import { permissionRouter } from './routes/permission.route.js';
import { projectRouter } from './routes/project.route.js';
import { roleRouter } from './routes/role.route.js'
import { userRouter } from './routes/user.route.js'
import { authRouter }  from './routes/auth.routes.js'; 

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use('/api', categoryRouter);
app.use('/api', financialDataRouter);
app.use('/api', permissionRouter);
app.use('/api', projectRouter);
app.use('/api', roleRouter);
app.use('/api', userRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

