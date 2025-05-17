const express = require('express');
const app = express();
// Correct (if routes/upload.js exists)
const uploadRoutes = require('./routes/upload');

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/', uploadRoutes);  // Mount routes

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});