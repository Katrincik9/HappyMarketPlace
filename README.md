# Happy Marketplace

A mobile-first marketplace demo built with React, TypeScript, Vite, and Material UI.
The project is being developed UI-first, with Redux powering cart behavior and
Redux Thunk/Axios integration planned for products, fake authentication, and admin
settings using [Fake Store API](https://fakestoreapi.com/).

## Current progress

- MUI theme, plain CSS, and CSS cascade layers configured.
- Responsive header, logo, mobile/desktop navigation, and shared page layout.
- Navigation context for switching between Products, Cart, and Account.
- Reusable product cards and a responsive grid using four local mock products.
- Account form using React Hook Form for required-field validation, with a
  password visibility toggle.
- Redux cart with one product per row, quantity controls, deletion, subtotals,
  and a full USD total.

The cart currently assumes a logged-in demo user: Add to cart works directly,
and items remain while navigating but reset on refresh. Buy is enabled with no
checkout action. Real authentication, per-user persistence, API integration, and
the admin page are not implemented yet. Guest restrictions return with authentication.
Detailed progress and remaining requirements are tracked in the
[implementation phases](docs/IMPLEMENTATION_PHASES.md).

## Run locally

Install Node.js and npm compatible with the project's Vite version, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check TypeScript/TSX with ESLint |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally after building |

Run focused cart tests with Node 24: `node --test tests/cartSlice.test.ts`.
No additional test framework is configured.

## Project documentation

- [Project overview](docs/PROJECT_OVERVIEW.md): requirements, scope, and open decisions.
- [Architecture](docs/ARCHITECTURE.md): current structure, state ownership,
  service boundaries, and responsive design guidance.
- [Implementation phases](docs/IMPLEMENTATION_PHASES.md): completed work,
  remaining steps, and acceptance criteria.
- [Agent instructions](AGENTS.md): required context and plan-before-implementation workflow.
