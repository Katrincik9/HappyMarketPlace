# Happy Marketplace

A mobile-first marketplace demo built with React, TypeScript, Vite, and Material UI.
The project is being developed UI-first, with Redux powering cart behavior and
the product-limit setting. Redux Thunk/Axios integration is planned for products
and fake authentication using [Fake Store API](https://fakestoreapi.com/).

## Current progress

- MUI theme, plain CSS, and CSS cascade layers configured.
- Responsive header, logo, mobile/desktop navigation, and shared page layout.
- React Router navigation for Products, Cart, Admin, and Account, including
  direct URLs, browser history, active links, and a Page not found screen.
- Reusable product cards and a responsive grid using 20 local mock products.
- Account form using React Hook Form for required-field validation, with a
  password visibility toggle.
- Redux cart with one product per row, quantity controls, deletion, subtotals,
  and a full USD total.
- Admin slider controlling 10-20 visible products, saved by redux-persist in
  local storage and restored before rendering. The default is 20; only this
  setting is persisted, not cart contents or form fields.

The cart currently assumes a logged-in demo user: Add to cart works directly,
and items remain while navigating but reset on refresh. Buy is enabled with no
checkout action. Admin is also visible to everyone as a UI preview. Real
authentication, per-user cart persistence, API integration, and admin access
restrictions are not implemented yet.
Detailed progress and remaining requirements are tracked in the
[implementation phases](docs/IMPLEMENTATION_PHASES.md).

## Run locally

Install Node.js and npm compatible with the project's Vite version, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.
If dependencies change while Vite is running, restart the development server.

## Routes and hosting

- `/products`, `/cart`, `/admin`, `/account`.
- `/` redirects to `/products`; unknown URLs show Page not found.

For production, configure the host to serve `index.html` for application paths,
without rewriting real asset requests. This lets direct links and refresh work.
Cart and Admin routes are not protected yet.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check TypeScript/TSX with ESLint |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally after building |

No automated test framework is configured.

## Project documentation

- [Project overview](docs/PROJECT_OVERVIEW.md): requirements, scope, and open decisions.
- [Architecture](docs/ARCHITECTURE.md): current structure, state ownership,
  service boundaries, and responsive design guidance.
- [Implementation phases](docs/IMPLEMENTATION_PHASES.md): completed work,
  remaining steps, and acceptance criteria.
- [Agent instructions](AGENTS.md): required context and plan-before-implementation workflow.
