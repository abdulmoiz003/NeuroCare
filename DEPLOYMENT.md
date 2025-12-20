# NeuroCare Backend Deployment Guide

## Deploy to Render

### Prerequisites
1. Create a free account at [Render.com](https://render.com)
2. Create a free MongoDB Atlas database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Steps:

#### 1. Setup MongoDB Atlas
1. Go to MongoDB Atlas and create a free cluster
2. Create a database user with password
3. Whitelist all IP addresses (0.0.0.0/0) in Network Access
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/NeuroCare`)

#### 2. Deploy Node.js Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository: `abdulmoiz003/NeuroCare`
4. Configure the service:
   - **Name**: `neurocare-backend`
   - **Root Directory**: `NeuroCare/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `PORT` = 5000
   - `STRIPE_SECRET_KEY` = Your Stripe secret key

6. Click "Create Web Service"

#### 3. Deploy Python AI Models on Render (Optional - for each AI model)

For Alzheimer Detection API:
1. Create new Web Service
2. Configure:
   - **Root Directory**: `NeuroCare/server/ai_models`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python alzheimer_server.py`

Repeat for other AI models (Parkinson, Stroke)

#### 4. Update Frontend API URLs
After deployment, update your frontend to use the deployed backend URL:
- Backend URL will be: `https://neurocare-backend.onrender.com`

### Alternative: Railway

1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add environment variables
6. Deploy!

## Local Development

```bash
cd NeuroCare/server
npm install
npm run dev
```
