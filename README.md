# Happy Marketplace

A mobile-first marketplace demo built with React, TypeScript, Vite, and Material UI.
The project is being developed UI-first, with Redux, Redux Thunk, and Axios
integration planned for products, fake authentication, cart behavior, and admin
settings using [Fake Store API](https://fakestoreapi.com/).

## Current progress

- MUI theme, plain CSS, and CSS cascade layers configured.
- Responsive header, logo, mobile/desktop navigation, and shared page layout.
- Navigation context for switching between Products, Cart, and Account.
- Reusable product cards and a responsive grid using four local mock products.
- Account form using React Hook Form for required-field validation, with a
  password visibility toggle; Cart page placeholder.

API integration, Redux state management, authentication, cart behavior, and the
admin page are not implemented yet. Add to cart opens a login-required dialog
with a link into the existing Login page; it does not add items yet.
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

No automated test runner is configured yet.

## Project documentation

- [Project overview](docs/PROJECT_OVERVIEW.md): requirements, scope, and open decisions.
- [Architecture](docs/ARCHITECTURE.md): current structure, state ownership,
  service boundaries, and responsive design guidance.
- [Implementation phases](docs/IMPLEMENTATION_PHASES.md): completed work,
  remaining steps, and acceptance criteria.
- [Agent instructions](AGENTS.md): required context and plan-before-implementation workflow.
