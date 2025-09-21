const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

// Simple in-memory storage
const users = [];

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, persona } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      persona,
      createdAt: new Date()
    };
    
    users.push(user);
    console.log('User created:', email);
    
    res.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    console.log('User logged in:', email);
    
    res.json({ 
      success: true, 
      token: 'dummy-token', 
      user: { id: user.id, email, persona: user.persona } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
});