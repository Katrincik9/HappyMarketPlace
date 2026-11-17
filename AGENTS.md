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
- Follow the UI-first sequence. Redux and Redux Thunk remain requirements;
  navigation context must not become a replacement for business-state Redux.
- Distinguish implemented code from planned architecture and pending verification.
  An installed dependency is not an implemented feature.
- Preserve deliberate UI choices: the anonymous login caption is removed.
  For the current cart preview, assume a logged-in demo user and add directly
  through Redux. This is not authentication; do not persist a fabricated session.
  When real authentication is added, restore the agreed guest login dialog with
  Cancel and Log in actions instead of allowing guest cart additions.
  Cart minus at quantity 1 removes the item. Buy is enabled but has no action.
  Admin is temporarily visible to everyone. Its 10-20 product-limit slider
  defaults to 20, commits on release, and persists through redux-persist.
  Only settings is persisted; cart and form fields are not. PersistGate waits
  for restoration before rendering. Settings state is a numeric product limit.
  The reducer validates committed changes; restored-data validation and custom
  storage-error handling are not implemented. There is no settings notice state
  or alert UI. Keep cart out of the persistence whitelist until user-specific
  restoration is implemented. Reducing the limit must not remove cart items.
  Category is now shown above the title, and the original numeric rate accompanies
  rounded stars and the parenthesized review count.
- Follow confirmed policies in the overview: persistent randomly chosen admin,
  refresh-restored login, per-user persisted carts, USD, and Phase 3 URL routing
  replacing page-selection context. Discuss remaining edge cases, not these
  settled policies, before their implementation.

## Repository conventions

- Use React and TypeScript, MUI components where useful, and plain CSS.
- Keep application styles inside `@layer app`; MUI's `mui` layer is ordered first.
- Keep component CSS beside its component. Header, mobile navigation, and
  desktop navigation have separate stylesheets.
- Page components live in `src/components/pages`.
- Shared types live in `src/types`; static menu/sample data live in
  `src/constants`; logo and sample illustrations live in `src/assets`.
- Use `NavigationProvider` and `useNavigation` for current page selection.
  Replace that mechanism with URL routing in Phase 3 as approved.
  Keep the mobile drawer's open/close state local.
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
- Keep implementation context in AGENTS.md and docs, not only in chat history.
  Document responsive intent and breakpoint roles rather than copying mutable
  CSS dimensions. Current source code is the authority for exact styling values.
