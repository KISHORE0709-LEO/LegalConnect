#!/bin/bash

# Google Cloud deployment script for Legal Connect

set -e

echo "🚀 Starting Legal Connect deployment to Google Cloud..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI not found. Please install it first."
    exit 1
fi

# Set project
PROJECT_ID="legal-connect-ai"
gcloud config set project $PROJECT_ID

echo "📦 Building application..."
npm run build:prod

echo "🏗️ Deploying infrastructure with Terraform..."
cd terraform
terraform init
terraform plan
terraform apply -auto-approve
cd ..

echo "🔧 Deploying backend services..."
gcloud app deploy app.yaml --quiet

echo "☁️ Setting up Cloud Build trigger..."
gcloud builds triggers create github \
  --repo-name=legal-connect \
  --repo-owner=your-github-username \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml

echo "📊 Setting up monitoring..."
gcloud logging sinks create legal-connect-sink \
  bigquery.googleapis.com/projects/$PROJECT_ID/datasets/legal_connect_logs

echo "✅ Deployment completed successfully!"
echo "🌐 Application URL: https://$PROJECT_ID.appspot.com"