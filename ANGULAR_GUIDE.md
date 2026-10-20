# Angular Front-End Guide

The React app in `frontend/` is the main, complete front end. If you prefer **Angular**, this guide builds the same site on top of the **same backend** (no backend changes needed). Starter files are in `angular-guide/`.

> The Angular starter covers the core pieces: API service, login state, auth interceptor, route guard, navbar, services page, login and dashboard. The remaining pages (home, pricing, about, contact, signup) follow the same patterns, and the table in step 7 shows how each React page maps over.

Use **Angular 17 or newer** (standalone components, signals and `@if` / `@for` syntax).

## 1. Install tools

```bash
npm install -g @angular/cli
ng version
```

## 2. Create the Angular project

From the `build-plan-studio` folder:

```bash
ng new frontend-angular --routing --style=css --ssr=false
cd frontend-angular
```

(Answer *No* to SSR for now.)

## 3. Copy the starter files

Copy everything from `angular-guide/` into the new project:

| From | To |
|---|---|
| `angular-guide/src/app/**` | `frontend-angular/src/app/` (overwrite when asked) |
| `angular-guide/proxy.conf.json` | `frontend-angular/proxy.conf.json` |

Newer Angular versions generate `app.ts` / `app.html` instead of `app.component.ts`. If so, either keep the generated root component and paste in the `template` and `imports` from `angular-guide/src/app/app.component.ts`, or delete the generated one and point `main.ts` at `AppComponent`.

Make sure `src/main.ts` boots with the config:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

## 4. Share the styling

Copy `frontend/src/styles/main.css` to `frontend-angular/src/styles.css` (replace its contents). Add the Google Fonts `<link>` from `frontend/index.html` into `frontend-angular/src/index.html`. The class names (`container`, `card`, `btn`, `form`, `notice`, …) are the same, so the look matches.

## 5. Connect to the backend

In `frontend-angular/angular.json`, under `projects → <name> → architect → serve → options`, add:

```json
"proxyConfig": "proxy.conf.json"
```

Then run both servers:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend-angular && ng serve
```

Open http://localhost:4200. Requests to `/api/...` are forwarded to the Express server on port 5000. Add `http://localhost:4200` to `CLIENT_ORIGIN` in `backend/.env` only if you call the API without the proxy.

## 6. How the pieces fit

```
app.config.ts          registers router + HttpClient + authInterceptor
app.routes.ts          URL → component; dashboard protected by authGuard
core/api.service.ts    every backend call, with typed responses
core/auth.service.ts   login / signup / logout, user kept in a signal + localStorage
core/auth.interceptor  adds the JWT header to all requests
core/auth.guard        redirects to /login if not logged in
components/navbar      menu, shows Log in / Sign up or Dashboard / Log out
pages/*                one standalone component per page
```

## 7. Finish the remaining pages

| React page | Angular equivalent to create | Notes |
|---|---|---|
| `Home.jsx` | `ng g c pages/home --standalone` | Reuse the markup; load services and plans with `ApiService` |
| `Pricing.jsx` + `PricingCards` | `ng g c pages/pricing --standalone` | Call `api.pricing()`, format price with the `currency:'INR'` pipe (`CurrencyPipe`) |
| `About.jsx` | `ng g c pages/about --standalone` | Static HTML |
| `Contact.jsx` | `ng g c pages/contact --standalone` | Reactive form → `api.contact()` |
| `Signup.jsx` | `ng g c pages/signup --standalone` | Same as login plus `role` radio buttons, then `auth.signup()` |
| `Footer.jsx` | `ng g c components/footer --standalone` | Add `<app-footer />` in `app.component.ts` |

Then register each in `app.routes.ts`, for example:

```ts
{ path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) },
```

Pattern for any data page:

```ts
export class PricingComponent {
  private api = inject(ApiService);
  plans = signal<Plan[]>([]);
  constructor() { this.api.pricing().subscribe(r => this.plans.set(r.plans)); }
}
```

```html
@for (p of plans(); track p.id) { <article class="card">{{ p.name }} — {{ p.price | currency:'INR' }}</article> }
```

## 8. Build for production

```bash
ng build
```

Output is in `dist/frontend-angular/browser`. Deploy it as described in `docs/DEPLOYMENT.md`, with a rewrite of all paths to `index.html`. Replace the relative `/api` URLs with a base URL from `src/environments` if the API is on another domain.

## 9. Using React and Angular together

You normally ship **one** front end. Keep React for the live site and Angular as the alternative, or pick one and delete the other folder. Both talk to the same API, so you can switch without touching `backend/`.

## 10. Visual Studio / VS Code tips for Angular

- VS Code: install the **Angular Language Service** extension.
- Visual Studio 2022: open the `frontend-angular` folder (File → Open → Folder) and use the terminal for `ng serve`.
- Debug in the browser with F12, or use the *JavaScript Debug Terminal* in VS Code.
