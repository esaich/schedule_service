// src/app.js - Fokus pada routing
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/shifts', require('./routes/shiftRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/swaps', require('./routes/swapRoutes'));

module.exports = app; // Export app untuk testing