# Setup Guide: Visual Studio and VS Code

This project is JavaScript (Node.js), so it runs in **Visual Studio Code** (recommended, lightest) or **Visual Studio 2022**.

## 1. Install the tools

1. **Node.js LTS** (18 or newer): https://nodejs.org. Check in a terminal: `node -v` and `npm -v`.
2. **Git** (optional): https://git-scm.com.
3. Choose one editor:
   - **VS Code**: https://code.visualstudio.com. Recommended extensions: *ESLint*, *Prettier*, *ES7+ React/Redux snippets*, *Thunder Client* (to test the API).
   - **Visual Studio 2022**: run the Visual Studio Installer, click **Modify**, and tick the workload **Node.js development** (and **ASP.NET and web development** if you want the JavaScript/React project templates).

## 2. Open the project

### VS Code
1. **File → Open Folder…** and choose `build-plan-studio`.
2. Open the built-in terminal: **Terminal → New Terminal**.

### Visual Studio 2022
1. **File → Open → Folder…** and choose `build-plan-studio`. (Open Folder mode works with plain Node projects and needs no `.sln` file.)
2. Open the terminal: **View → Terminal**.
3. Visual Studio can show `backend` and `frontend` in Solution Explorer's folder view. Edit files there as normal.

## 3. Run the back end

In the terminal:

```bash
cd backend
copy .env.example .env      # on Mac/Linux:  cp .env.example .env
```

Open `.env` and set a long random `JWT_SECRET`, for example:

```
PORT=5000
JWT_SECRET=put-a-long-random-string-here
CLIENT_ORIGIN=http://localhost:5173
```

Then:

```bash
npm install
npm run seed:admin      # one time: creates the admin (design team) account
npm run dev             # starts the API with auto-restart
```

Test it: open http://localhost:5000/api/health. You should see `{"ok":true}`.

## 4. Run the front end

Open a **second** terminal (click the **+** in the terminal panel):

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The front end sends every `/api/...` call to the back end through the proxy in `frontend/vite.config.js`, so there are no CORS problems during development.

## 5. Try the full flow

1. Click **Sign up**, choose *Client*, create an account. You land on the **Dashboard**.
2. Fill **Share your ideas**, tick services and click **Send to our team**.
3. Log out. Log in as `admin@buildplanstudio.com` / `ChangeMe123!`.
4. The admin dashboard lists every request. Change a status and the customer sees it update.

## 6. Debugging

### VS Code
Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "API",
      "program": "${workspaceFolder}/backend/src/server.js",
      "cwd": "${workspaceFolder}/backend"
    }
  ]
}
```

Press **F5** to debug the API with breakpoints. For the React app use the browser DevTools (F12) or the *JavaScript Debug Terminal*.

### Visual Studio 2022
Right-click `backend/src/server.js` and choose **Set as Startup Item**, then press **F5**.

## 7. Production build

```bash
cd frontend
npm run build        # creates frontend/dist
```

See `docs/DEPLOYMENT.md` for hosting.

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| `Missing JWT_SECRET` when starting the API | You did not create `.env`. Copy `.env.example` to `.env`. |
| Pages show "Could not load services… Is the backend running?" | Start the back end (step 3). Check http://localhost:5000/api/health. |
| `npm install` fails with network errors | Check your internet, proxy or VPN. Try `npm cache clean --force`. |
| Port already in use | Change `PORT` in `.env`, and the proxy target in `frontend/vite.config.js`. |
| Login says "Session expired" after changing `JWT_SECRET` | Log in again. Old tokens are invalid. |
