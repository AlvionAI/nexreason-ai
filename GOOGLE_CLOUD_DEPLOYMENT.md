# ☁️ Google Cloud Platform Deployment Guide

## 🎯 **Why Google Cloud for NexReason?**

Perfect choice for your **Alvion AI** platform! Here's why:

- ✅ **Seamless Integration**: Native integration with Google Analytics & Gemini AI
- ✅ **Global CDN**: Fast loading worldwide for your multilingual platform
- ✅ **Auto-scaling**: Handles traffic spikes automatically
- ✅ **Cost-effective**: Pay only for what you use
- ✅ **Professional**: Enterprise-grade infrastructure

---

## 🚀 **Deployment Options**

### **Option 1: Cloud Run (Recommended)**
- **Best for**: Production-ready, auto-scaling
- **Cost**: ~$5-20/month for moderate traffic
- **Setup time**: 15-30 minutes

### **Option 2: App Engine**
- **Best for**: Zero-config deployment
- **Cost**: ~$10-30/month
- **Setup time**: 10-20 minutes

### **Option 3: Compute Engine + Docker**
- **Best for**: Full control, custom configurations
- **Cost**: ~$20-50/month
- **Setup time**: 45-60 minutes

---

## 🌟 **Option 1: Cloud Run Deployment (Recommended)**

### **Step 1: Prerequisites**

```bash
# Install Google Cloud CLI
# macOS
brew install google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install

# Login to Google Cloud
gcloud auth login

# Set your project (create one if needed)
gcloud config set project YOUR_PROJECT_ID
```

### **Step 2: Create Dockerfile**

Create `Dockerfile` in your project root:

```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### **Step 3: Update next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
  },
  // Add environment variables
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
}

module.exports = nextConfig
```

### **Step 4: Create .dockerignore**

```
node_modules
.next
.git
.gitignore
README.md
Dockerfile
.dockerignore
npm-debug.log
.env.local
.env.*.local
```

### **Step 5: Deploy to Cloud Run**

```bash
# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build and deploy in one command
gcloud run deploy nexreason \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GEMINI_KEY" \
  --set-env-vars="NEXT_PUBLIC_GA_MEASUREMENT_ID=YOUR_GA_ID" \
  --memory=1Gi \
  --cpu=1 \
  --max-instances=10
```

### **Step 6: Custom Domain (Optional)**

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service nexreason \
  --domain nexreason.com \
  --region us-central1
```

---

## 🎯 **Option 2: App Engine Deployment**

### **Step 1: Create app.yaml**

```yaml
runtime: nodejs18

env_variables:
  NODE_ENV: production
  GOOGLE_GENERATIVE_AI_API_KEY: YOUR_GEMINI_KEY
  NEXT_PUBLIC_GA_MEASUREMENT_ID: YOUR_GA_ID

automatic_scaling:
  min_instances: 0
  max_instances: 10
  target_cpu_utilization: 0.6

resources:
  cpu: 1
  memory_gb: 1
  disk_size_gb: 10
```

### **Step 2: Deploy**

```bash
# Deploy to App Engine
gcloud app deploy

# View your app
gcloud app browse
```

---

## 🔧 **Environment Variables Setup**

### **Method 1: Command Line (Secure)**

```bash
# For Cloud Run
gcloud run services update nexreason \
  --set-env-vars="GOOGLE_GENERATIVE_AI_API_KEY=your_actual_key" \
  --set-env-vars="NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" \
  --region us-central1
```

### **Method 2: Secret Manager (Most Secure)**

```bash
# Create secrets
gcloud secrets create gemini-api-key --data-file=-
# Paste your API key and press Ctrl+D

gcloud secrets create ga-measurement-id --data-file=-
# Paste your GA ID and press Ctrl+D

# Deploy with secrets
gcloud run deploy nexreason \
  --source . \
  --set-secrets="GOOGLE_GENERATIVE_AI_API_KEY=gemini-api-key:latest" \
  --set-secrets="NEXT_PUBLIC_GA_MEASUREMENT_ID=ga-measurement-id:latest" \
  --region us-central1
```

---

## 📊 **Monitoring & Analytics**

### **Cloud Monitoring Setup**

```bash
# Enable monitoring
gcloud services enable monitoring.googleapis.com

# Create uptime check
gcloud alpha monitoring uptime create \
  --display-name="NexReason Uptime" \
  --http-check-path="/" \
  --hostname="your-domain.com"
```

### **Logging**

```bash
# View logs
gcloud run logs tail nexreason --region us-central1

# View specific logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=nexreason"
```

---

## 💰 **Cost Optimization**

### **Cloud Run Pricing**
- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GiB-second
- **Requests**: $0.40 per million requests
- **Free tier**: 2 million requests/month

### **Estimated Monthly Costs**
- **1,000 users/month**: ~$5-10
- **10,000 users/month**: ~$15-25
- **50,000 users/month**: ~$50-75

### **Cost Optimization Tips**

```bash
# Set minimum instances to 0 for cost savings
gcloud run services update nexreason \
  --min-instances=0 \
  --region us-central1

# Set memory limit
gcloud run services update nexreason \
  --memory=512Mi \
  --region us-central1
```

---

## 🔒 **Security Best Practices**

### **IAM & Security**

```bash
# Create service account for your app
gcloud iam service-accounts create nexreason-sa \
  --display-name="NexReason Service Account"

# Grant minimal permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:nexreason-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### **HTTPS & SSL**
- ✅ **Automatic HTTPS**: Cloud Run provides automatic SSL
- ✅ **Custom Domain SSL**: Free SSL certificates
- ✅ **Security Headers**: Already implemented in your app

---

## 🚀 **CI/CD Pipeline (Optional)**

### **GitHub Actions for Auto-Deploy**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - id: 'auth'
      uses: 'google-github-actions/auth@v1'
      with:
        credentials_json: '${{ secrets.GCP_SA_KEY }}'
    
    - name: 'Set up Cloud SDK'
      uses: 'google-github-actions/setup-gcloud@v1'
    
    - name: 'Deploy to Cloud Run'
      run: |
        gcloud run deploy nexreason \
          --source . \
          --platform managed \
          --region us-central1 \
          --allow-unauthenticated
```

---

## 📈 **Performance Optimization**

### **Cloud CDN Setup**

```bash
# Enable Cloud CDN for global performance
gcloud compute backend-services create nexreason-backend \
  --global

# Add your Cloud Run service as backend
gcloud compute backend-services add-backend nexreason-backend \
  --global \
  --network-endpoint-group=nexreason-neg \
  --network-endpoint-group-region=us-central1
```

### **Caching Strategy**
- ✅ **Static Assets**: Cached at CDN edge
- ✅ **API Responses**: Your performance.ts handles caching
- ✅ **Images**: Automatic optimization

---

## 🎯 **Launch Checklist for Google Cloud**

### **Pre-Launch**
- [ ] Google Cloud project created
- [ ] Billing account linked
- [ ] APIs enabled (Cloud Run, Cloud Build)
- [ ] Environment variables configured
- [ ] Custom domain purchased (optional)

### **Deployment**
- [ ] Dockerfile created and tested
- [ ] Build successful locally
- [ ] Deploy to Cloud Run
- [ ] Custom domain mapped
- [ ] SSL certificate active

### **Post-Launch**
- [ ] Uptime monitoring configured
- [ ] Logging enabled
- [ ] Cost alerts set up
- [ ] Performance monitoring active

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Check build logs
gcloud builds log BUILD_ID

# Local testing
docker build -t nexreason .
docker run -p 3000:3000 nexreason
```

#### **Environment Variables Not Working**
```bash
# Check current env vars
gcloud run services describe nexreason --region us-central1

# Update env vars
gcloud run services update nexreason \
  --update-env-vars="KEY=VALUE" \
  --region us-central1
```

#### **Memory/CPU Issues**
```bash
# Increase resources
gcloud run services update nexreason \
  --memory=2Gi \
  --cpu=2 \
  --region us-central1
```

---

## 💡 **Why Google Cloud is Perfect for NexReason**

### **Technical Benefits**
- **Native Gemini AI Integration**: Same ecosystem
- **Global Analytics**: Perfect for GA4 integration
- **Auto-scaling**: Handles viral growth
- **99.9% Uptime**: Enterprise reliability

### **Business Benefits**
- **Cost-effective**: Pay per use
- **Professional**: Enterprise-grade infrastructure
- **Scalable**: Grows with your success
- **Integrated**: All Google services work together

---

## 🎊 **Ready to Deploy!**

Your **Alvion AI** NexReason platform will run beautifully on Google Cloud with:

- ⚡ **Lightning-fast global performance**
- 🔒 **Enterprise-grade security**
- 📊 **Seamless analytics integration**
- 💰 **Cost-effective scaling**
- 🌍 **Worldwide availability**

**Choose Google Cloud Run for the best balance of simplicity, performance, and cost!**

---

*Need help? The Google Cloud community is excellent, and your platform is already optimized for cloud deployment!*

**Good luck with your Sunday launch on Google Cloud!** ☁️🚀 