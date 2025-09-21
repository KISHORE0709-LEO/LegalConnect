const request = require('supertest');
const app = require('../server');

describe('GCP Integration Tests', () => {
  test('Health check endpoint', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('healthy');
  });

  test('Document analysis integration', async () => {
    const mockFile = Buffer.from('test document content');
    
    const response = await request(app)
      .post('/api/analyze-document')
      .attach('document', mockFile, 'test.pdf')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.documentId).toBeDefined();
  });

  test('Batch processing integration', async () => {
    const documents = [
      { text: 'Contract 1 content' },
      { text: 'Contract 2 content' }
    ];
    
    const response = await request(app)
      .post('/api/batch-analyze')
      .send({ documents })
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.results).toHaveLength(2);
  });

  test('Webhook integration', async () => {
    const webhookData = {
      documentId: 'test-doc-123',
      status: 'processed'
    };
    
    const response = await request(app)
      .post('/api/webhook/document-processed')
      .send(webhookData)
      .expect(200);
    
    expect(response.body.success).toBe(true);
  });
});