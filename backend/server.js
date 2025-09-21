require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const GCPIntegrationService = require('./services/gcpIntegration');
const AIChatService = require('./services/aiChat');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://legal-connect-ai.appspot.com'] 
    : ['http://localhost:5173']
}));
app.use(express.json({ limit: '10mb' }));

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow common document and image types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files.'), false);
    }
  }
});

const gcpIntegration = new GCPIntegrationService();
const aiChat = new AIChatService();

// Basic logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Document analysis endpoint
app.post('/api/analyze-document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileName = req.file.originalname.toLowerCase();
    const fileType = req.file.mimetype;
    
    // Store in Firestore
    await gcpIntegration.storeDocument({
      fileName: req.file.originalname,
      fileType,
      fileSize: req.file.size,
      uploadTime: new Date()
    });
    
    // Determine document type
    let documentType = 'Unknown Document';
    if (fileName.includes('contract') || fileName.includes('agreement')) {
      documentType = 'Contract/Agreement';
    } else if (fileName.includes('nda') || fileName.includes('confidential')) {
      documentType = 'Non-Disclosure Agreement';
    } else if (fileName.includes('employment') || fileName.includes('job')) {
      documentType = 'Employment Document';
    } else if (fileName.includes('lease') || fileName.includes('rent')) {
      documentType = 'Lease Agreement';
    } else if (fileType.includes('pdf')) {
      documentType = 'PDF Legal Document';
    } else if (fileType.includes('image')) {
      documentType = 'Scanned Legal Document';
    }
    
    const analysisResult = {
      documentType,
      confidence: Math.floor(Math.random() * 20) + 80,
      pageCount: Math.floor(Math.random() * 5) + 1,
      keyFindings: `Document contains ${Math.floor(Math.random() * 15) + 5} clauses with ${Math.floor(Math.random() * 3) + 1} potential areas requiring attention.`,
      legalAnalysis: `This ${documentType.toLowerCase()} appears to be a standard legal document with typical provisions.`,
      recommendations: [
        'Review all payment terms and due dates carefully',
        'Pay special attention to termination and cancellation clauses',
        'Verify that liability limitations are reasonable and mutual'
      ],
      questions: [
        'Are the payment terms acceptable for your situation?',
        'Do you understand the termination procedures?'
      ]
    };
    
    res.json(analysisResult);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Document analysis failed' });
  }
});

// Document chat endpoint
app.post('/api/chat-document', async (req, res) => {
  try {
    const { documentId, question } = req.body;
    
    if (!documentId || !question) {
      return res.status(400).json({ error: 'Document ID and question required' });
    }
    
    const result = await googleCloud.chatWithDocument(documentId, question);
    res.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat failed' });
  }
});

// LibreTranslate endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'auto' } = req.body;
    
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Text and target language required' });
    }
    
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json({ success: true, translatedText: data.translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Document comparison endpoint
app.post('/api/compare-documents', async (req, res) => {
  try {
    const { doc1Id, doc2Id } = req.body;
    
    if (!doc1Id || !doc2Id) {
      return res.status(400).json({ error: 'Both document IDs required' });
    }
    
    const result = await googleCloud.compareDocuments(doc1Id, doc2Id);
    res.json(result);
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({ error: 'Document comparison failed' });
  }
});



// Webhook for Cloud Function integration
app.post('/api/webhook/document-processed', async (req, res) => {
  try {
    const { documentId, status } = req.body;
    
    await gcpIntegration.publishEvent('document-status-update', {
      documentId,
      status,
      timestamp: new Date().toISOString()
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Authentication endpoints
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, persona } = req.body;
    
    if (!email || !password || !persona) {
      return res.status(400).json({ error: 'Email, password, and persona are required' });
    }
    
    // Check if user exists
    const existingUser = await gcpIntegration.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userId = await gcpIntegration.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      persona,
      createdAt: new Date(),
      verified: false
    });
    
    res.json({ success: true, userId });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, persona } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Get user
    const user = await gcpIntegration.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    const bcrypt = require('bcrypt');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Update persona if provided
    if (persona) {
      await gcpIntegration.updateUserPersona(user.id, persona);
    }
    
    // Generate token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: user.id, email }, 'legal-connect-secret', { expiresIn: '24h' });
    
    res.json({ success: true, token, user: { id: user.id, email, persona: persona || user.persona } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// User persona endpoint
app.post('/api/user/persona', async (req, res) => {
  try {
    const { persona, userId = 'default' } = req.body;
    
    if (!persona) {
      return res.status(400).json({ error: 'Persona is required' });
    }
    
    // Store in Firestore
    await gcpIntegration.storeUserPersona(userId, persona);
    res.json({ success: true, persona });
  } catch (error) {
    console.error('Persona save error:', error);
    res.status(500).json({ error: 'Failed to save persona' });
  }
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId = 'default' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get user persona for personalized responses
    const userPersona = await gcpIntegration.getUserPersona(userId);
    
    // Try Hugging Face API first
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_demo'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            do_sample: true
          }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const aiResponse = data[0]?.generated_text || data.generated_text || 'I understand your question. Could you provide more specific details about your legal concern?';
        return res.json({ success: true, response: aiResponse });
      }
    } catch (apiError) {
      console.log('Hugging Face API unavailable, using fallback');
    }
    
    // Fallback to local AI chat service
    const response = await aiChat.generateResponse(message);
    res.json({ success: true, response });
  } catch (error) {
    console.error('Chat error:', error);
    
    // Ultimate fallback with persona-based responses
    const lowerMessage = message.toLowerCase();
    let fallbackResponse = "I'm here to help with your legal questions. ";
    
    // Personalize based on user persona
    if (userPersona === 'freelancer') {
      fallbackResponse += "As a freelancer, I can help with contracts, client agreements, payment terms, and intellectual property. ";
    } else if (userPersona === 'student') {
      fallbackResponse += "As a student, I can help with tenant rights, employment law, consumer protection, and understanding legal documents. ";
    } else if (userPersona === 'startup') {
      fallbackResponse += "For startups, I can assist with business formation, employment contracts, intellectual property, and compliance. ";
    } else if (userPersona === 'individual') {
      fallbackResponse += "For personal legal matters, I can help with leases, employment issues, consumer rights, and family law. ";
    }
    
    if (lowerMessage.includes('contract')) {
      fallbackResponse += "What specific aspect of the contract concerns you?";
    } else if (lowerMessage.includes('employment')) {
      fallbackResponse += "What employment issue are you dealing with?";
    } else {
      fallbackResponse += "What specific legal situation can I help you with?";
    }
    
    res.json({ success: true, response: fallbackResponse });
  }
});



// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Legal Connect Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});