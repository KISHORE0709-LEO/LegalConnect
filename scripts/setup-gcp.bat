@echo off
REM Google Cloud setup script for Windows

echo 🚀 Setting up Google Cloud for Legal Connect...

REM Check if gcloud is installed
gcloud version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Google Cloud CLI not found. Please install it first.
    exit /b 1
)

set PROJECT_ID=legal-connect-ai

echo 📋 Creating Google Cloud project...
gcloud projects create %PROJECT_ID% --name="Legal Connect AI"
gcloud config set project %PROJECT_ID%

echo 💳 Enabling billing (manual step required)...
echo Please enable billing for project %PROJECT_ID% in the Google Cloud Console

echo 🔧 Enabling required APIs...
gcloud services enable aiplatform.googleapis.com
gcloud services enable documentai.googleapis.com
gcloud services enable translate.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable appengine.googleapis.com

echo 👤 Creating service account...
gcloud iam service-accounts create legal-connect-sa --description="Service account for Legal Connect" --display-name="Legal Connect Service Account"

echo 🔑 Setting up IAM permissions...
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:legal-connect-sa@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/aiplatform.user"
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:legal-connect-sa@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/documentai.apiUser"
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:legal-connect-sa@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/cloudtranslate.user"

echo 🗂️ Creating App Engine application...
gcloud app create --region=us-central

echo ✅ Google Cloud setup completed!
echo 📝 Next steps:
echo 1. Enable billing in Google Cloud Console
echo 2. Run: npm run deploy