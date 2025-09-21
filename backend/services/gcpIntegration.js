const { Firestore } = require('@google-cloud/firestore');

class GCPIntegrationService {
  constructor() {
    this.firestore = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'legal-connect-ai',
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
    });
    this.userCollection = 'users';
  }

  async createUser(userData) {
    try {
      const userRef = this.firestore.collection(this.userCollection).doc();
      await userRef.set(userData);
      return userRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const snapshot = await this.firestore.collection(this.userCollection)
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  async updateUserPersona(userId, persona) {
    try {
      const userRef = this.firestore.collection(this.userCollection).doc(userId);
      await userRef.update({ persona, updatedAt: new Date() });
      return { success: true };
    } catch (error) {
      console.error('Error updating persona:', error);
      throw error;
    }
  }

  async storeUserPersona(userId, persona) {
    try {
      const userRef = this.firestore.collection(this.userCollection).doc(userId);
      await userRef.set({
        persona,
        updatedAt: new Date(),
        createdAt: new Date()
      }, { merge: true });
      
      console.log(`Stored persona ${persona} for user ${userId}`);
      return { success: true };
    } catch (error) {
      console.error('Error storing user persona:', error);
      throw error;
    }
  }

  async getUserPersona(userId) {
    try {
      const userRef = this.firestore.collection(this.userCollection).doc(userId);
      const doc = await userRef.get();
      
      if (doc.exists) {
        const userData = doc.data();
        return userData.persona || 'individual';
      }
      
      return 'individual'; // Default persona
    } catch (error) {
      console.error('Error getting user persona:', error);
      return 'individual'; // Default on error
    }
  }

  async storeUserSession(userId, sessionData) {
    try {
      const sessionRef = this.firestore.collection('sessions').doc(userId);
      await sessionRef.set({
        ...sessionData,
        lastActive: new Date()
      }, { merge: true });
      
      return { success: true };
    } catch (error) {
      console.error('Error storing session:', error);
      throw error;
    }
  }

  async storeDocument(documentData) {
    try {
      const docRef = this.firestore.collection('documents').doc();
      await docRef.set(documentData);
      return { success: true, documentId: docRef.id };
    } catch (error) {
      console.error('Error storing document:', error);
      throw error;
    }
  }

  async recordMetric(metricName, value, metadata = {}) {
    try {
      const metricRef = this.firestore.collection('metrics').doc();
      await metricRef.set({
        name: metricName,
        value,
        metadata,
        timestamp: new Date()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error recording metric:', error);
      throw error;
    }
  }

  async publishEvent(eventType, eventData) {
    try {
      const eventRef = this.firestore.collection('events').doc();
      await eventRef.set({
        type: eventType,
        data: eventData,
        timestamp: new Date()
      });
      
      console.log(`Published event: ${eventType}`);
      return { success: true };
    } catch (error) {
      console.error('Error publishing event:', error);
      throw error;
    }
  }

  async batchAnalyze(documents) {
    try {
      const results = [];
      
      for (const doc of documents) {
        // Simulate batch processing
        const result = {
          documentId: doc.id,
          status: 'processed',
          analysis: `Processed document: ${doc.name}`,
          timestamp: new Date()
        };
        results.push(result);
        
        // Store result in Firestore
        await this.firestore.collection('document_analysis').doc(doc.id).set(result);
      }
      
      return results;
    } catch (error) {
      console.error('Error in batch analysis:', error);
      throw error;
    }
  }
}

module.exports = GCPIntegrationService;