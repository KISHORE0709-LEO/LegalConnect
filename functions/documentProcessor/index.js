const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai');

const storage = new Storage();
const documentAI = new DocumentProcessorServiceClient();

functions.cloudEvent('processDocument', async (cloudEvent) => {
  const { bucket, name } = cloudEvent.data;
  
  if (!name.endsWith('.pdf')) return;
  
  const file = storage.bucket(bucket).file(name);
  const [fileBuffer] = await file.download();
  
  const request = {
    name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us/processors/${process.env.PROCESSOR_ID}`,
    rawDocument: {
      content: fileBuffer.toString('base64'),
      mimeType: 'application/pdf'
    }
  };
  
  const [result] = await documentAI.processDocument(request);
  
  // Store processed result
  const outputFile = storage.bucket(bucket).file(`processed/${name}.json`);
  await outputFile.save(JSON.stringify(result.document));
  
  console.log(`Processed document: ${name}`);
});