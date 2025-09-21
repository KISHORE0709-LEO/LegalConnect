# Google Cloud AI Setup for Legal Connect

## Prerequisites
1. Google Cloud Account with billing enabled
2. Google Cloud CLI installed
3. Node.js and npm installed

## Step 1: Create Google Cloud Project
```bash
gcloud projects create legal-connect-ai --name="Legal Connect AI"
gcloud config set project legal-connect-ai
```

## Step 2: Enable Required APIs
```bash
gcloud services enable aiplatform.googleapis.com
gcloud services enable documentai.googleapis.com
gcloud services enable translate.googleapis.com
gcloud services enable storage.googleapis.com
```

## Step 3: Create Service Account
```bash
gcloud iam service-accounts create legal-connect-sa \
    --description="Service account for Legal Connect" \
    --display-name="Legal Connect Service Account"

gcloud projects add-iam-policy-binding legal-connect-ai \
    --member="serviceAccount:legal-connect-sa@legal-connect-ai.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding legal-connect-ai \
    --member="serviceAccount:legal-connect-sa@legal-connect-ai.iam.gserviceaccount.com" \
    --role="roles/documentai.apiUser"

gcloud projects add-iam-policy-binding legal-connect-ai \
    --member="serviceAccount:legal-connect-sa@legal-connect-ai.iam.gserviceaccount.com" \
    --role="roles/cloudtranslate.user"
```

## Step 4: Generate Service Account Key
```bash
gcloud iam service-accounts keys create ./backend/service-account-key.json \
    --iam-account=legal-connect-sa@legal-connect-ai.iam.gserviceaccount.com
```

## Step 5: Set Environment Variables
Create `backend/.env` file:
```
GOOGLE_CLOUD_PROJECT_ID=legal-connect-ai
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
PORT=3001
```

## Step 6: Install Backend Dependencies
```bash
cd backend
npm install
```

## Step 7: Start Backend Server
```bash
npm run dev
```

## Google Cloud AI Tools Used:

### 1. Gemini Pro (Vertex AI)
- Document analysis and summarization
- Legal jargon simplification
- Q&A with documents
- Risk assessment

### 2. Document AI
- OCR for scanned documents
- Document parsing and extraction
- Form recognition

### 3. Google Translate API
- Multi-language support
- Legal document translation
- Real-time translation

### 4. Vertex AI
- Custom model training
- AI model deployment
- Batch processing

## Frontend Integration
The frontend connects to the backend API which uses Google Cloud AI services:

1. Upload document → Document AI processes → Gemini analyzes
2. Ask questions → Gemini provides answers with context
3. Translate content → Google Translate API
4. Compare documents → Gemini identifies differences

## Cost Optimization
- Use batch processing for multiple documents
- Implement caching for repeated queries
- Set usage quotas and alerts
- Use appropriate model sizes (gemini-pro vs gemini-pro-vision)