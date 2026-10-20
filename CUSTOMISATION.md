# Customisation

| I want to change… | Edit |
|---|---|
| Studio name in the menu and footer | `frontend/src/components/Navbar.jsx`, `Footer.jsx`, and `<title>` in `frontend/index.html` |
| Colours and fonts | CSS variables at the top of `frontend/src/styles/main.css` (`--accent`, `--ink`, `--paper`, `--display`) |
| Hero headline and text | `frontend/src/components/Hero.jsx` |
| Services per customer type | `backend/src/data/catalog.js` (`userTypes`) and `SERVICES_BY_ROLE` in `frontend/src/pages/Dashboard.jsx` |
| Pricing plans and rates | `backend/src/data/catalog.js` (`pricing`) |
| About page | `frontend/src/pages/About.jsx` |
| Menu items | `links` array in `frontend/src/components/Navbar.jsx`, plus a `<Route>` in `App.jsx` |
| Add a new page | Create `pages/MyPage.jsx`, add a `<Route path="/my-page" element={<MyPage />} />` in `App.jsx`, add a link in `Navbar.jsx` |
| Project statuses | `projectStatuses` in `catalog.js` and `STATUSES` in `Dashboard.jsx` |
| Currency | `Intl.NumberFormat` in `PricingCards.jsx` |
| Logo | Replace the SVG in `Navbar.jsx` with `<img src="/logo.svg" />` (put the file in `frontend/public/`) |

## Adding a service

1. Add the entry to the right `services` list in `catalog.js`, for example `{ id: "interior", name: "Interior Design", description: "…" }`.
2. Add `["interior", "Interior Design"]` to the same role in `SERVICES_BY_ROLE` in `Dashboard.jsx`.
3. Restart the API.
