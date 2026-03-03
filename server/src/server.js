require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORRECT PATH - routes folder is in same src directory
const profileRoutes = require('./routes/profile.routes');

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV 
  });
});

app.use('/api', profileRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═════════════════════════════════════════╗
║     Server running on port ${PORT}       ║
║     CORS enabled                        ║
╚═════════════════════════════════════════╝
  `);
});

module.exports = app;