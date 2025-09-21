const { Firestore } = require('@google-cloud/firestore');
const GCPIntegrationService = require('./gcpIntegration');

class GoogleCloudService {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
    
    // Initialize basic clients only
    this.firestore = new Firestore({ projectId: this.projectId });
    this.gcp = new GCPIntegrationService();
  }

  async analyzeDocument(fileBuffer, fileName) {
    try {
      // Simple document analysis without AI for now
      const analysis = `Document Analysis for ${fileName}:\n\n1. Document Type: Legal Document\n2. Size: ${fileBuffer.length} bytes\n3. Status: Successfully processed\n4. Recommendations: Please review all clauses carefully`;
      
      // Store in Firestore
      const docRef = this.firestore.collection('documents').doc();
      await docRef.set({
        fileName,
        uploadTime: new Date(),
        analysis,
        fileSize: fileBuffer.length
      });
      
      return {
        success: true,
        analysis,
        documentId: docRef.id
      };
      
    } catch (error) {
      console.error('Document analysis error:', error);
      throw error;
    }
  }

  async chatWithDocument(documentId, question) {
    try {
      // Get document from Firestore
      const docRef = this.firestore.collection('documents').doc(documentId);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        throw new Error('Document not found');
      }
      
      const documentData = doc.data();
      
      // Query Gemini with context
      const model = this.vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `Based on this legal document, answer the following question:
      
      Question: ${question}
      
      Document context: ${documentData.originalText}
      
      Provide a clear, accurate answer with specific references to sections or clauses.`;
      
      const response = await model.generateContent(prompt);
      const answer = response.response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        answer,
        documentId
      };
      
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  async translateText(text, targetLanguage) {
    try {
      const [translation] = await this.translate.translate(text, targetLanguage);
      return {
        success: true,
        translatedText: translation,
        sourceLanguage: 'auto-detected'
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async compareDocuments(doc1Id, doc2Id) {
    try {
      // Get both documents
      const [doc1, doc2] = await Promise.all([
        this.firestore.collection('documents').doc(doc1Id).get(),
        this.firestore.collection('documents').doc(doc2Id).get()
      ]);
      
      if (!doc1.exists || !doc2.exists) {
        throw new Error('One or both documents not found');
      }
      
      const doc1Data = doc1.data();
      const doc2Data = doc2.data();
      
      // Compare with Gemini
      const model = this.vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `Compare these two legal documents and identify:
      1. Key differences
      2. Similar clauses
      3. Missing elements in each
      4. Risk implications of differences
      
      Document 1: ${doc1Data.originalText}
      
      Document 2: ${doc2Data.originalText}`;
      
      const response = await model.generateContent(prompt);
      const comparison = response.response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        comparison,
        documents: {
          doc1: doc1Data.fileName,
          doc2: doc2Data.fileName
        }
      };
      
    } catch (error) {
      console.error('Comparison error:', error);
      throw error;
    }
  }
}

module.exports = GoogleCloudService;