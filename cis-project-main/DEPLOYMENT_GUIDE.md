# Free Deployment Guide - Zero Cost

Deploy your CIS project for free using: Supabase + Render + Vercel

## Step 1: Setup Database (Supabase) - FREE

### Create Supabase Account & Database

1. Go to https://supabase.com
2. Click **"Start your project"** (free tier)
3. Sign up with GitHub
4. Create a new project:
   - Project name: `cis-project`
   - Region: Choose closest to you
   - Password: Save this
5. Click **Create new project** (takes ~2 min)

### Get Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Find **Connection string** section
3. Copy the **"psql"** connection string:
   ```
   postgresql://postgres:[YOUR_PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
   - Replace `[YOUR_PASSWORD]` with your project password

4. Save this as your `DATABASE_URL`

### Run Migrations on Supabase

1. Install PostgreSQL client (if not already):
   ```powershell
   # Windows - using psql (comes with PostgreSQL installation)
   ```

2. From your backend folder, run:
   ```powershell
   cd backend
   npx prisma migrate deploy
   ```

   When prompted for `DATABASE_URL`, use your Supabase connection string.

3. Verify tables created:
   ```powershell
   npm run prisma:studio
   ```
   Should show your Supabase tables ✅

## Step 2: Deploy Backend (Render) - FREE

### Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Click **Connect a repository** → Authorize GitHub
5. Search for `cis-project` repository
6. Click **Connect**

### Configure Backend Service

1. **Name**: `cis-project-backend`
2. **Environment**: `Node`
3. **Build Command**: 
   ```
   cd backend && npm install && npm run build
   ```
4. **Start Command**: 
   ```
   cd backend && npm start
   ```
5. **Instance Type**: Free (0.5 CPU)

### Add Environment Variables

In Render dashboard:
1. Scroll to **Environment**
2. Add variables:
   ```
   DATABASE_URL = postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
   NODE_ENV = production
   PORT = 10000
   ```

3. Click **Deploy**
4. Wait ~5 minutes for deployment
5. Your backend URL: `https://cis-project-backend.onrender.com`

## Step 3: Update Frontend (Vercel) - FREE

### Prepare Frontend

1. Update API base URL in `src/app/api/careerService.ts`:

```typescript
// Change this:
const API_BASE_URL = 'http://localhost:5000/api';

// To this:
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

2. Create `.env.production` in root folder:
```
VITE_API_URL=https://cis-project-backend.onrender.com/api
```

3. Commit and push to GitHub

### Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **Add New** → **Project**
4. Select `cis-project` repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add environment variable:
   ```
   VITE_API_URL = https://cis-project-backend.onrender.com/api
   ```

7. Click **Deploy**
8. Wait for deployment (~3-5 min)
9. Your app URL: `https://your-project.vercel.app`

## Step 4: Test Everything

1. Open your Vercel app: `https://your-project.vercel.app`
2. Try creating data
3. Check Supabase dashboard → Data shows up ✅
4. Refresh page → Data persists ✅

## Free Tier Limits (More than enough)

| Service | Free Tier | Notes |
|---------|-----------|-------|
| **Supabase** | 500MB + 2GB bandwidth | Enough for dev/small projects |
| **Render** | 1 web service, 500 hrs/month | Sleeps after 15 min inactivity |
| **Vercel** | Unlimited deployments | Perfect for frontend |

## Important Notes

⚠️ **Render Free Tier**: Backend goes to sleep after 15 mins of inactivity
- First request takes ~30 seconds to wake up
- Not ideal for production, but fine for testing
- Upgrade to $7/month for always-on

⚠️ **Supabase**: Free tier has limits but great for development

## Deployment Checklist

- [ ] Supabase database created
- [ ] Migrations run on Supabase
- [ ] Backend deployed on Render
- [ ] Environment variables set
- [ ] Frontend deployed on Vercel
- [ ] Updated API URL in frontend
- [ ] Tested end-to-end

## Easy Upgrade Path (If Needed)

When you're ready for production:
- **Supabase Pro**: $25/month (unlimited)
- **Render**: $7/month for always-on backend
- **Vercel Pro**: $20/month (more analytics)

**Total**: ~$52/month for production-ready setup

## Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL is correct in Render
- Verify Supabase connection string format
- Make sure migrations ran: `npx prisma migrate deploy`

### "CORS error in browser"
- Check backend CORS is configured for Vercel domain
- Update `.env` in backend with Vercel URL

### "Render backend not responding"
- Free tier sleeps after 15 mins
- Send a request to wake it up
- Check Render logs for errors

## Next: Custom Domain (Optional - Free)

Once deployed, you can add a free domain:
- Freenom.com (free .tk/.ml domains)
- GitHub Pages (frontend only)
