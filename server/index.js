const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add two numbers endpoint
app.post('/api/add', (req, res) => {
  const { a, b } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ 
      error: 'Both a and b must be numbers' 
    });
  }
  
  const result = a + b;
  res.json({ result, a, b });
});

// GET version for convenience
app.get('/api/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ 
      error: 'Both a and b must be valid numbers' 
    });
  }
  
  const result = a + b;
  res.json({ result, a, b });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
