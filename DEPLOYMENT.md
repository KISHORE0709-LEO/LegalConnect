# Legal Connect - Google Cloud Deployment Guide

## Overview
This guide covers deploying Legal Connect to Google Cloud Platform with full scalability, performance optimization, and monitoring.

## Architecture
- **Frontend**: React app served via Google App Engine
- **Backend**: Node.js API with Google Cloud AI services
- **Database**: Firestore for document metadata
- **Storage**: Cloud Storage for document files
- **AI Services**: Vertex AI (Gemini), Document AI, Translate API
- **Monitoring**: Cloud Logging, Cloud Monitoring
- **CI/CD**: Cloud Build with automated deployments

## Prerequisites
1. Google Cloud account with billing enabled
2. Google Cloud CLI installed
3. Node.js 20+ and npm
4. Terraform (optional, for infrastructure as code)

## Quick Setup

### Windows
```cmd
# Run the setup script
scripts\setup-gcp.bat
```

### Linux/Mac
```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run setup
./scripts/deploy.sh
```

## Manual Setup

### 1. Create Google Cloud Project
```bash
gcloud projects create legal-connect-ai --name="Legal Connect AI"
gcloud config set project legal-connect-ai
```

### 2. Enable APIs
```bash
gcloud services enable aiplatform.googleapis.com
gcloud services enable documentai.googleapis.com
gcloud services enable translate.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable appengine.googleapis.com
```

### 3. Deploy Infrastructure
```bash
cd terraform
terraform init
terraform apply
```

### 4. Deploy Application
```bash
npm run build:prod
gcloud app deploy
```

## Environment Variables

### Production (.env.production)
```
NODE_ENV=production
GOOGLE_CLOUD_PROJECT_ID=legal-connect-ai
GOOGLE_CLOUD_LOCATION=us-central1
DOCUMENT_PROCESSOR_ID=your-processor-id
PORT=8080
```

## Scaling Configuration

### Automatic Scaling (app.yaml)
- **Min instances**: 1
- **Max instances**: 10
- **CPU target**: 60%
- **Memory**: 2GB per instance

### Performance Optimizations
1. **Frontend**: Code splitting, tree shaking, compression
2. **Backend**: Connection pooling, caching, rate limiting
3. **Database**: Indexed queries, batch operations
4. **Storage**: CDN integration, lifecycle policies

## Monitoring & Logging

### Cloud Logging
- Request/response logging
- Error tracking
- Performance metrics
- Custom application logs

### Cloud Monitoring
- Application performance
- Resource utilization
- Custom metrics
- Alerting policies

## Security Features
1. **Helmet.js**: Security headers
2. **Rate limiting**: API protection
3. **CORS**: Cross-origin restrictions
4. **IAM**: Least privilege access
5. **Secret Manager**: Secure credential storage

## Cost Optimization
1. **Auto-scaling**: Pay for actual usage
2. **Storage lifecycle**: Automatic cleanup
3. **Batch processing**: Efficient AI API usage
4. **Caching**: Reduced API calls

## CI/CD Pipeline

### Cloud Build (cloudbuild.yaml)
1. Install dependencies
2. Run tests
3. Build application
4. Deploy to App Engine
5. Run health checks

### GitHub Integration
```bash
gcloud builds triggers create github \
  --repo-name=legal-connect \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

## Troubleshooting

### Common Issues
1. **API quotas**: Check service limits
2. **Permissions**: Verify IAM roles
3. **Build failures**: Check logs in Cloud Build
4. **Performance**: Monitor resource usage

### Health Checks
- **Endpoint**: `/api/health`
- **Expected**: `{"status": "healthy"}`
- **Monitoring**: Automatic alerts on failures

## Support
For deployment issues, check:
1. Cloud Build logs
2. App Engine logs
3. Error Reporting dashboard
4. Cloud Monitoring metrics