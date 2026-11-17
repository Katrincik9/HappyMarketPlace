# Happy Marketplace: project overview

## Purpose and scope

Build a learning/demo marketplace with a mobile-first React interface, product
catalogue, fake login, local cart behavior, and an admin-controlled product limit.
Fake Store API is the backend; this project does not build its own backend.

The mobile reference is inspiration, not a design to copy:
[design reference](https://docs.google.com/drawings/d/1AScz1Mx2setqWXdq_Jr9wpyqDpEbpkhd0V_rYl_YWxc/edit).
Tablet and desktop layouts must be designed as well, including a larger logo.

Related documents:
[architecture](ARCHITECTURE.md) and [implementation phases](IMPLEMENTATION_PHASES.md).
The root [AGENTS.md](../AGENTS.md) is the coding-assistant entry point.

## Required technology

- React with TypeScript (existing Vite application).
- Repository ESLint configuration: [eslint.config.js](../eslint.config.js).
- Redux and Redux Thunk for asynchronous coordination.
- Axios for API requests.
- Extensive use of Material UI, customized primary and secondary theme colors.
- Plain CSS only; mobile-first rules and MUI CSS cascade layers.

Redux Toolkit and React Redux power the in-memory cart and product-limit setting.
redux-persist saves only settings; PersistGate delays rendering until restoration.
React Router handles URL navigation. Axios and additional test frameworks are
not installed at this checkpoint.
Redux Toolkit's default thunk middleware can satisfy the Redux Thunk requirement;
RTK Query is not the selected asynchronous approach.

## Functional requirements

### Products

- Request products from `GET https://fakestoreapi.com/products`.
- Show title, price, description, category, image, original numeric rating, and stars.
- Round whole stars: 3.4 becomes 3; 3.5 becomes 4. Keep the numeric rate unrounded.
- Permit Add to cart only for authenticated users.
- Keep the button enabled for guests, but open a login-required dialog instead
  of mutating the cart. Offer Cancel and Log in; Log in opens the Login page.

### Cart

- Show added products in a compact form, without an Add to cart button.
- Repeated additions increment quantity rather than duplicate product rows.
- Show quantity per item and a total based on unit price times quantity.
- Include plus/minus quantity controls and a delete icon. Minus at one removes
  the item. Show image, category, title, unit price, and subtotal in one row per
  product; omit rating and description.
- Show an enabled Buy control without checkout functionality initially.
- Backend cart endpoints are not required for this scope.
- Persist a separate cart per user across logout/login and refresh. Hide Cart
  from anonymous navigation and block direct access and additions when logged out.

### Login and logout

- Submit username and password to `POST https://fakestoreapi.com/auth/login`
  using Axios; persist the returned token in local storage.
- Show anonymous/authenticated navigation appropriately.
- Restore the authenticated session after refresh, including the user identity
  needed to load the correct cart and determine admin status.
- Logout removes the active session and returns the UI to anonymous state,
  without deleting the user's saved cart or the chosen admin ID.
- Never persist passwords. This is demo authentication, not production security.

### Admin

- Randomly select one admin from the users returned by the API and persist the
  chosen user ID. Reuse it after refresh; do not reselect on logout or login.
- Restrict admin navigation/page access to that demo role.
- Provide an integer slider from 10 to 20 for the products limit.
- Persist the limit in local storage and request `/products?limit=<value>`.
- Commit slider changes before refetching rather than requesting on every drag.

## Current implementation checkpoint

| Area | Implemented | Not yet implemented or verified |
| --- | --- | --- |
| Foundation | MUI, Emotion, CSS layers, custom palette/type, CssBaseline | Final visual/browser acceptance |
| Shell | Header, asset logo, footer, main container, responsive spacing | Full responsive regression pass |
| Navigation | React Router, desktop/mobile links, active styling, root redirect, not-found page | Role-aware navigation, protected routes, production-host verification |
| Products | 20 local samples reusing four SVG illustrations, cards, ratings, limited fluid grid | API, request states, final browser acceptance |
| Cart and login | Account form; Redux cart rows, quantity controls, removal, totals, empty state | Real login, invalid-credentials feedback, per-user cart persistence |
| Admin | Menu/page preview, integer 10-20 slider, persisted numeric limit | Role assignment, access guards, restored-data validation, actual API limit |
| State and requests | URL-owned navigation, local UI state, Redux cart/settings slices and typed hooks | API thunks, auth slice, Axios services |
| Validation | Build/lint during implementation; manual behavior checks | Automated behavior tests and final browser acceptance |

### Deliberate UI changes and requirement gaps

- Category is displayed above the product title as requested.
- The anonymous login caption below Add to cart was removed by request.
  A login-required dialog now explains the restriction after clicking the button.
- Current approved exception: assume a logged-in demo user while implementing
  the cart. Add to cart directly updates Redux without the guest dialog.
  This does not create an authenticated session. Guest access restrictions and
  the login-required dialog must return with real authentication.
- Cart survives page changes but is in memory only and resets on refresh.
  Persisting only settings is the agreed minimum for now. Do not introduce a
  browser-wide saved cart; implement per-user persistence after authentication.
- React Router replaces page-selection context. Routes are `/products`, `/cart`,
  `/admin`, and `/account`; `/` redirects to `/products`. Unknown URLs show a
  not-found screen with a Products link. Navigation and logo links do not reload
  the app, preserving the in-memory cart. Account inputs reset when leaving.
- Admin navigation/page access is temporarily unrestricted. Its slider controls
  the number of products, not pages. Draft values stay local; committed values
  update Redux and redux-persist saves settings to local storage. With no saved
  setting, show 20 products. The former manual-storage format is ignored; the
  switch to redux-persist intentionally starts at 20 without migrating that value.
  The settings reducer rejects invalid committed limits with a RangeError.
  The current minimal persistence config has no restoration transform, custom
  error handlers, or settings alerts. Restored values are not currently validated;
  the default of 20 applies when no setting was saved, not to all invalid data.
  Cart snapshots are unaffected by changes to the catalogue limit.
- Cards display rounded stars, the original numeric rate, and review count in
  parentheses. Star rounding does not change the displayed numeric rate.
- USD is confirmed; keep the existing en-US preview formatting unless changed.
- The login screen is labeled Account in both menus. Its form uses `useForm`,
  clears on leaving the page, and masks passwords with an eye-button toggle.
  Incomplete submissions show required-field errors, including whitespace-only
  usernames. Valid submission navigates to Products without checking credentials
  or establishing a session. The mock-result selector was removed;
  invalid-credentials clearing and feedback remain pending. No credentials
  are persisted by the application.
- Hero/intro copy, decorative placeholders, and the skip link were removed.
  Accessibility review remains a future acceptance task.

## Confirmed decisions (planned behavior, not yet implemented)

1. **Random admin:** choose one user randomly from successfully fetched API users
   and save the selected user ID in local storage. Reuse the saved choice after
   refresh and login/logout. Do not select from an empty/failed response or generate
   randomness in reducers/rendering. The choice is browser-local, not a shared
   backend role; clearing storage can cause a new selection.
2. **Session restoration:** keep users logged in after refresh. Persist the token
   and minimum non-sensitive identity metadata needed for per-user carts; derive
   admin status from the persisted selected admin ID. Never persist passwords.
3. **Cart lifetime:** persist carts separately by stable user ID. Logout hides
   Cart, denies access/additions, and clears the active cart from view without
   deleting saved carts. Logging in restores only that user's cart.
4. **Currency:** use USD; the existing en-US formatting can remain.
5. **Routing (implemented):** React Router's BrowserRouter owns page selection,
   including direct URLs, refresh, and browser history. The former navigation
   context is removed; do not duplicate page state in Redux.

### Remaining implementation details and UI deferrals

- Configure and verify the production host's SPA fallback for direct URLs and
  refresh. Cart/Admin access restrictions still depend on authentication.
- Define session payload validation and handling of malformed/expired sessions,
  and what to do if a persisted admin ID no longer exists in fetched users.
  These edge cases do not change the confirmed persistence policies.
- Guest Add to cart messaging is agreed and implemented as a dialog; keep the
  removed inline caption absent.
- Add restored-limit validation and review persistence failure handling before
  treating malformed or unavailable storage as covered.

## Out of scope initially

Real payments/orders, registration, product CRUD, a custom backend, search,
filters, and backend cart synchronization. Removal and plus/minus quantity
editing are now explicitly requested cart features.

## Next milestone

Finish Phase 2's missing product states, then obtain a visual
review across screen sizes. See the [roadmap](IMPLEMENTATION_PHASES.md) for the
exact checklists. Continue one agreed step at a time.
