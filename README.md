# Production-Grade Spotify Clone

A full-stack, production-ready music streaming platform built with Next.js / React 18, TypeScript, Tailwind CSS, Node.js + Express, PostgreSQL (Prisma ORM), Redis, AWS S3 / HTTP Range Audio Streaming, and Socket.io.

Includes top 20 trending Indian songs: **Arz Kiya Hai**, **Tum Ho Toh**, **Bairan**, **Gehra Hua**, **Tujhe Kitna Chahne Lage**, **Samjhawan**, **Sajni**, **Husn**, **Chaleya**, **Heeriye**, and more!

---

## 🎵 Top 20 Indian Tracks Included

| Rank | Song | Artist(s) |
| ---: | --------------------------------- | ----------------------------------------- |
| 1 | Arz Kiya Hai | Anuv Jain (Coke Studio Bharat) |
| 2 | Tum Ho Toh (From *Saiyaara*) | Vishal Mishra, Hansika Pareek |
| 3 | Bairan | Banjaare |
| 4 | Khat | Navjot Ahuja |
| 5 | Gehra Hua | Shashwat Sachdev, Arijit Singh |
| 6 | Tujhe Kitna Chahne Lage | Arijit Singh |
| 7 | Samjhawan | Jawad Ahmad, Arijit Singh, Shreya Ghoshal |
| 8 | KALYANI (Remix) | ARJN, KDS, FIFTY4, Shreya Ghoshal |
| 9 | Mann Mera | Gajendra Verma |
| 10 | Sajni | Arijit Singh |
| 11 | Raanjhan | Sachet–Parampara |
| 12 | O Maahi | Arijit Singh |
| 13 | Ishq Hai | Anurag Saikia |
| 14 | Husn | Anuv Jain |
| 15 | Pehle Bhi Main | Vishal Mishra |
| 16 | Jo Tum Mere Ho | Anuv Jain |
| 17 | Chaleya | Arijit Singh, Shilpa Rao |
| 18 | Satranga | Arijit Singh |
| 19 | Apna Bana Le | Arijit Singh, Sachin–Jigar |
| 20 | Heeriye | Arijit Singh, Jasleen Royal |

---

## 🚀 Quick Local Start

### 1. Build Shared Package:
```bash
cd shared
npm install
npm run build
```

### 2. Start Backend API Server:
```bash
cd server
npm install
npm run dev
```

### 3. Start Frontend Web App:
```bash
cd client
npm install
npm run dev
```

---

## 🌐 Full Deployment Guide (Frontend & Backend)

### Option 1: Deploying the Frontend (`/client`)

#### Strategy A: Vercel Deployment (Recommended for React/Next.js)
1. Push your monorepo repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository and set the **Root Directory** to `client`.
4. Configure Build Settings:
   - **Framework Preset**: Vite / Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Set Environment Variables:
   - `VITE_API_URL` = `https://your-backend-api.onrender.com/api/v1`
6. Click **Deploy**. Vercel will provide your production URL (e.g. `https://spotify-clone-client.vercel.app`).

#### Strategy B: Netlify Deployment
1. Log into [Netlify](https://netlify.com) and click **Add New Site** > **Import from Git**.
2. Set Base Directory: `client`.
3. Set Build Command: `npm run build` and Publish Directory: `client/dist`.
4. Add redirect rewrite rule in `client/public/_redirects`:
   ```text
   /*  /index.html  200
   ```
5. Deploy Site.

---

### Option 2: Deploying the Backend (`/server`)

#### Strategy A: Render.com / Railway (Easiest Cloud PaaS)
1. Push repo to GitHub.
2. Log into [Render.com](https://render.com) and click **New Web Service**.
3. Set **Root Directory** to `server`.
4. Build & Start Commands:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Provision a managed **PostgreSQL & Redis** instance on Render / Neon DB / Supabase.
6. Configure Environment Variables in Render Dashboard:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `DATABASE_URL` = `postgresql://user:pass@ep-host.region.aws.neon.tech/neondb?sslmode=require`
   - `REDIS_URL` = `rediss://default:pass@redis-host.upstash.io:6379`
   - `JWT_ACCESS_SECRET` = `your_production_secret_key`
   - `CLIENT_ORIGIN` = `https://spotify-clone-client.vercel.app`
7. Click **Deploy**. Render will host your API at `https://spotify-backend.onrender.com`.

#### Strategy B: AWS EC2 / Docker Production Deployment
1. SSH into your AWS EC2 instance (Ubuntu 22.04 LTS).
2. Install Docker & Nginx:
   ```bash
   sudo apt update && sudo apt install -y docker.co docker-compose nginx certbot python3-certbot-nginx
   ```
3. Clone repository and launch Docker containers:
   ```bash
   git clone https://github.com/your-username/website.git
   cd website
   docker-compose -f docker-compose.yml up -d --build
   ```
4. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/default`):
   ```nginx
   server {
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
       }
   }
   ```
5. Enable SSL Certificate:
   ```bash
   sudo certbot --nginx -d api.yourdomain.com
   ```
