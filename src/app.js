const errorHandler = require('./middleware/errorHandler');
const express = require('express');
const authRoutes = require('./routes/auth'); 
const usersRoutes = require('./routes/users');
const resourcesRoutes = require('./routes/resources');
const reservationsRoutes = require('./routes/reservations');

const app = express();

app.use(express.json());

// --- ROUTES ---
app.use('/auth', authRoutes); 
app.use('/api/users', usersRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/reservations', reservationsRoutes);

app.use(errorHandler);
module.exports = app;