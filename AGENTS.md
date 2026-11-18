# Project context and working instructions

Read these documents before planning or changing this project:

1. [Project overview](docs/PROJECT_OVERVIEW.md): requirements, scope, current state,
   deliberate UI deferrals, and unresolved product decisions.
2. [Architecture](docs/ARCHITECTURE.md): current implementation and intended
   React/Redux/service boundaries based on the supplied architecture diagram.
3. [Implementation phases](docs/IMPLEMENTATION_PHASES.md): detailed checklists,
   dependencies, acceptance criteria, and next steps.

## Working approach

- Before implementation, read the context documents, explain the proposed plan
  or overall approach, and wait for the user's approval. Give the user a chance
  to change scope, behavior, or design before editing application code.
- If an approved approach needs a material change, discuss it before proceeding.
  Do not treat roadmap entries as permission to implement them.
- Implement one agreed step at a time. Do not implement an entire future phase
  because it appears in the roadmap.
- Follow the agreed UI-first sequence and implementation phases.
- Distinguish implemented code from planned architecture and pending verification.
  An installed dependency is not an implemented feature.
- Preserve the confirmed behavior, deliberate exceptions, and decisions
  documented in the project overview and architecture.
- Discuss unresolved edge cases before implementation rather than reopening
  settled policies.

## Repository conventions

- Use React and TypeScript, MUI components where useful, and plain CSS.
- Keep application styles inside `@layer app`; MUI's `mui` layer is ordered first.
- Keep component CSS beside its component. Header, mobile navigation, and
  desktop navigation have separate stylesheets.
- Keep only reusable UI components in `src/components`. Page components and
  their styles live separately in `src/pages`.
- Shared types live in `src/types`; static menu/sample data live in
  `src/constants`; logo and sample illustrations live in `src/assets`.
- Use React Router's BrowserRouter with `/products`, `/cart`, `/admin`, and
  `/account`. `/` redirects to `/products`; unknown URLs show Page not found.
  Use Link/NavLink for navigation and useNavigate for form redirects. Derive
  menu selection from the URL; do not restore page-selection context or store
  the current page in Redux. Keep the drawer's open/close state local.
- Production hosting must serve `index.html` for app paths so direct links and
  refresh work. Preserve normal handling for actual asset requests.
- Reuse existing patterns without introducing unnecessary wrappers or abstractions.
- Use the repository's `eslint.config.js`; it currently checks TS/TSX, not CSS.
- Never store passwords or real secrets in source code or browser storage.

## Verification and documentation

- Use `npm run lint` and `npm run build` for implementation changes, selecting
  smaller checks when sufficient. `npm run dev` starts development;
  `npm run preview` serves the production build.
- No automated test framework is currently installed.
- Verify responsive and interactive behavior in a browser; build success alone
  is not evidence that layouts, focus, or drawer cleanup work.
- Documentation-only edits do not require a build. Check local links and accuracy.
- Update the relevant phase checkboxes after implementation and verification.
  Keep unresolved decisions and temporarily deferred requirements explicit.
- Update architecture decisions when boundaries change. Keep the README as an
  overview of purpose, progress, and run commands, with links to detailed docs.
- Keep AGENTS.md focused on working instructions. Record requirements,
  implementation context, and decisions in the linked project documents,
  not only in chat history.
  Document responsive intent and breakpoint roles rather than copying mutable
  CSS dimensions. Current source code is the authority for exact styling values.
