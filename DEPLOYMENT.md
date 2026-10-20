# Deployment

You deploy two things: the **API** (Node) and the **static front end** (`frontend/dist`).

## Option A: Render (API) + Netlify or Vercel (front end)

### API on Render
1. Push the project to GitHub.
2. Render → **New Web Service** → pick the repo, **Root Directory** `backend`.
3. Build command `npm install`, start command `npm start`.
4. Environment variables: `JWT_SECRET` (long random), `CLIENT_ORIGIN` (your front-end URL), `PORT` is set by Render.
5. **Important:** Render's disk is temporary, so the JSON file database is wiped on redeploy. Switch to MongoDB Atlas or PostgreSQL first (see `ARCHITECTURE.md`).

### Front end on Netlify / Vercel
1. Root directory `frontend`, build command `npm run build`, publish directory `dist`.
2. Environment variable at build time: `VITE_API_URL=https://your-api.onrender.com`.
3. Add a rewrite so React Router works on refresh. Netlify: file `frontend/public/_redirects` containing
   `/*  /index.html  200`

## Option B: One server (VPS)

1. `cd frontend && npm run build`.
2. Serve `frontend/dist` with Nginx, and proxy `/api` to `localhost:5000`:

```nginx
server {
  server_name yourdomain.com;
  root /var/www/bps/frontend/dist;
  location / { try_files $uri /index.html; }
  location /api/ { proxy_pass http://127.0.0.1:5000; }
}
```

3. Run the API with PM2: `npm i -g pm2 && pm2 start src/server.js --name bps-api`.
4. Add HTTPS with Let's Encrypt (`certbot --nginx`).

## Pre-launch checklist
- [ ] Real database in place
- [ ] Strong `JWT_SECRET`, admin password changed
- [ ] `CLIENT_ORIGIN` set to the real domain
- [ ] `helmet` and rate limiting added
- [ ] Prices, About text and contact details replaced
- [ ] Privacy policy and terms pages added
