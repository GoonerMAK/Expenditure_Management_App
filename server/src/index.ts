import express from "express"
import categoryRoutes from './routes/category.route.js';
import financialDataRoutes from './routes/financial-data.route.js';
import permissionRoutes from './routes/permission.route.js';
import projectRoutes from './routes/project.route.js';
import roleRoutes from './routes/role.route.js'
import userRoutes from './routes/user.route.js'

const app = express()
app.use(express.json());

app.use('/api', categoryRoutes);
app.use('/api', financialDataRoutes);
app.use('/api', permissionRoutes);
app.use('/api', projectRoutes);
app.use('/api', roleRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

