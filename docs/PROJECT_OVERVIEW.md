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

Redux Toolkit, React Redux, and redux-persist are installed, but not integrated.
Axios, routing, and automated test tooling are not installed at this checkpoint.
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
- Show a Buy control without checkout functionality initially.
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
| Navigation | Context-based page selection; separate desktop/mobile menus | URL router, role-aware navigation |
| Products | Four local samples, SVG illustrations, reusable card, category, numeric rate, fluid grid | API, request states, browser acceptance |
| Cart and login | Account form with React Hook Form validation and password toggle; Cart heading | Real login, invalid-credentials feedback, cart rows and behavior |
| Admin | No page yet; selection policy agreed | Slider, role assignment, persistence |
| State and requests | Navigation context and local drawer state | Redux store/slices/thunks, Axios services |
| Validation | Build/lint have passed during implementation | Test runner and automated behavior tests |

### Deliberate UI changes and requirement gaps

- Category is displayed above the product title as requested.
- The anonymous login caption below Add to cart was removed by request.
  A login-required dialog now explains the restriction after clicking the button.
- Add to cart is enabled and opens that dialog for everyone while authentication
  is absent. No cart mutation or automatic post-login addition is implemented.
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
5. **Routing:** introduce URL routing in Phase 3 and replace current page-selection
   context. The URL will be the source of truth for page selection, including
   refresh and browser history.

### Remaining implementation details and UI deferrals

- Choose the router package, exact routes, and unknown-route behavior in the
  Phase 3 plan; the migration itself is approved.
- Define session payload validation and handling of malformed/expired sessions,
  and what to do if a persisted admin ID no longer exists in fetched users.
  These edge cases do not change the confirmed persistence policies.
- Guest Add to cart messaging is agreed and implemented as a dialog; keep the
  removed inline caption absent.

## Out of scope initially

Real payments/orders, registration, product CRUD, a custom backend, search,
filters, and backend cart synchronization. Removal and manual quantity editing
are optional extensions, not implied by the repeated-Add quantity requirement.

## Next milestone

Finish Phase 2's missing product states, then obtain a visual
review across screen sizes. See the [roadmap](IMPLEMENTATION_PHASES.md) for the
exact checklists. Continue one agreed step at a time.
