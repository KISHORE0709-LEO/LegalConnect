const { VertexAI } = require('@google-cloud/aiplatform');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');

class VertexAIService {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION;
    this.vertexAI = new VertexAI({ project: this.projectId, location: this.location });
    this.predictionClient = new PredictionServiceClient();
  }

  async analyzeWithGemini(prompt, modelType = 'gemini-1.5-pro') {
    const model = this.vertexAI.getGenerativeModel({ model: modelType });
    const response = await model.generateContent(prompt);
    return response.response.candidates[0].content.parts[0].text;
  }

  async batchAnalyze(documents) {
    const batchPromises = documents.map(doc => 
      this.analyzeWithGemini(`Analyze: ${doc.text}`)
    );
    return await Promise.all(batchPromises);
  }

  async customModelPredict(endpoint, instances) {
    const request = {
      endpoint: `projects/${this.projectId}/locations/${this.location}/endpoints/${endpoint}`,
      instances
    };
    const [response] = await this.predictionClient.predict(request);
    return response.predictions;
  }
}

module.exports = VertexAIService;