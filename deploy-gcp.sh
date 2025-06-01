#!/bin/bash

# 🚀 NexReason Google Cloud Deployment Script
# Alvion AI - Production Deployment

echo "🚀 Starting NexReason deployment to Google Cloud..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud CLI not found. Please install it first:${NC}"
    echo "   brew install google-cloud-sdk"
    echo "   Or visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Not logged in to Google Cloud. Logging in...${NC}"
    gcloud auth login
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ No project set. Please set your project:${NC}"
    echo "   gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo -e "${BLUE}📋 Project: $PROJECT_ID${NC}"

# Check for environment variables
if [ -z "$GOOGLE_GENERATIVE_AI_API_KEY" ] && [ ! -f .env.local ]; then
    echo -e "${RED}❌ Environment variables not found.${NC}"
    echo "Please set GOOGLE_GENERATIVE_AI_API_KEY and NEXT_PUBLIC_GA_MEASUREMENT_ID"
    echo "Either in .env.local file or as environment variables"
    exit 1
fi

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
    echo -e "${GREEN}✅ Loading environment variables from .env.local${NC}"
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Validate required environment variables
if [ -z "$GOOGLE_GENERATIVE_AI_API_KEY" ]; then
    echo -e "${RED}❌ GOOGLE_GENERATIVE_AI_API_KEY not set${NC}"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_GA_MEASUREMENT_ID" ]; then
    echo -e "${RED}❌ NEXT_PUBLIC_GA_MEASUREMENT_ID not set${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Enable required APIs
echo -e "${BLUE}🔧 Enabling required APIs...${NC}"
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build and deploy
echo -e "${BLUE}🏗️  Building and deploying to Cloud Run...${NC}"

# Set region (you can change this)
REGION="us-central1"
SERVICE_NAME="nexreason"

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="GOOGLE_GENERATIVE_AI_API_KEY=$GOOGLE_GENERATIVE_AI_API_KEY" \
  --set-env-vars="NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID" \
  --memory=1Gi \
  --cpu=1 \
  --max-instances=10 \
  --min-instances=0 \
  --timeout=300

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
    
    echo -e "${GREEN}✅ Your NexReason platform is live at:${NC}"
    echo -e "${BLUE}🌐 $SERVICE_URL${NC}"
    
    echo ""
    echo -e "${YELLOW}📋 Next Steps:${NC}"
    echo "1. Test your application: $SERVICE_URL"
    echo "2. Set up custom domain (optional)"
    echo "3. Monitor in Google Cloud Console"
    echo "4. Check Google Analytics for data"
    echo ""
    echo -e "${GREEN}🎊 Congratulations on your Alvion AI launch!${NC}"
    
else
    echo -e "${RED}❌ Deployment failed. Check the logs above for details.${NC}"
    exit 1
fi 