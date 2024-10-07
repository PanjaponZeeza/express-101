const express = require('express');
const app = express();
const port = 3000;

// Enable CORS for all routes (standard settings)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  
app.use(express.json());

// Sample API endpoints
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

app.post('/api/data', (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
