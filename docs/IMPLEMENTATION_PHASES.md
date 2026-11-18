# Implementation phases and progress

Use with the [overview](PROJECT_OVERVIEW.md) and
[architecture](ARCHITECTURE.md). Before each implementation step, discuss the
proposed approach and wait for user approval. Work one agreed step at a time.

## Tracking rules

- `[x]` means implemented in current code, or a decision explicitly made.
- `[ ]` means not implemented, not decided, or not yet verified, as stated.
- Implementation and browser/test acceptance are separate tasks.
- A temporary user-requested omission is not a completed original requirement.
- Update this checklist with each relevant change. Do not mark an entire phase
  complete just because its happy-path component renders.

## Status and next action

| Phase | Current status | Prerequisite |
| --- | --- | --- |
| 1. Foundation/shell | Implemented; final browser acceptance pending | None |
| 2. Products UI | In progress | Foundation |
| 3. Remaining interfaces | Account/cart/Admin routes and not-found screen implemented; role previews pending | Shared shell and UI conventions |
| 4. Redux/local behavior | Cart store, actions, selectors, and hooks implemented early | Product/cart/settings UI contracts |
| 5. API/auth | Not started | Redux and agreed session/role policies |
| 6. Admin integration | Local limit persistence implemented; API/auth integration pending | Admin UI, products thunk, settings/auth |
| 7. Verification/polish | Incremental checks only; final pass pending | Relevant features implemented |

**Current agreed step:** replace page-selection context with React Router for
Products, Cart, Admin, and Account. Access checks and API requests remain deferred.
Catalogue loading/error/empty states remain pending. Confirm subsequent steps
before implementation.

## Phase 1 - Visual foundation and app shell

### Implementation

- [x] Install MUI, Emotion, and MUI icons.
- [x] Enable MUI's CSS layer and establish `mui, app` ordering.
- [x] Configure primary/secondary palette, font defaults, and CssBaseline.
- [x] Define mobile spacing and shared main/footer/header containers.
- [x] Build Header, local SVG logo, navigation, and main content container.
- [x] Split mobile/desktop menus and their stylesheets.
- [x] Share navigation without prop drilling (now handled by React Router).
- [x] Keep static navigation items separate from shared types.
- [x] Add tablet sizing and desktop navigation.
- [x] Enlarge the logo on wider screens.
- [x] Run build and lint during implementation.

### Acceptance

- [ ] Finish browser checks at 300, 390, 599, 600, 899, 900, and wide desktop.
- [ ] Verify container alignment and no horizontal overflow.
- [ ] Open the drawer, resize to desktop and back, and confirm closed state,
  removed backdrop, released scroll lock, and usable navigation.
- [ ] Confirm plain app-layer CSS overrides MUI without specificity workarounds.

**Done when:** responsive shell and CSS override behavior are visually verified.
Do not add product or authentication behavior to finish this phase.

## Phase 2 - Products UI

### 2.1 Card and preview data

- [x] Define Product and ProductCardProps in the shared types folder.
- [x] Build a reusable prop-driven ProductCard using MUI.
- [x] Create 20 distinct local mock products reusing four local SVG illustrations.
- [x] Render cards inside ProductsPage's products grid.
- [x] Show image, title, description, and formatted preview USD price.
- [x] Show rounded whole stars using `Math.round`.
- [x] Show review count in parentheses.
- [x] Show the original numeric rating alongside stars; count does not replace rate.
- [x] Keep Add to cart enabled and open a login-required dialog for guests.
- [x] Display category above the title as requested.
- [x] Remove the login caption as explicitly requested.
- [x] Use a dialog with Cancel and Log in instead of restoring the inline caption.
- [x] Close the dialog on cancellation/dismissal; Log in opens the existing Login page.

### 2.2 Layout and content extremes

- [x] Use a fluid grid that fits cards to available space.
- [ ] Browser-check 1-2 mobile, 2-3 tablet, and 3-5 desktop column capacity.
- [ ] Check long titles/descriptions, small/large prices, and tall/wide images.
- [ ] Check bottom alignment of prices/buttons without clipped text.
- [ ] Check numeric rate and stars fit narrow cards and round 3.4/3.5 correctly.
- [ ] Review image alternative text and decide visible handling for missing images.

### 2.3 Catalogue states, without network requests yet

- [ ] Create a loading skeleton matching the card layout.
- [ ] Create an error state with an explicit Retry callback.
- [ ] Create an intentional empty-catalogue state distinct from request failure.
- [ ] Provide a simple local development preview for each state; do not add fake
  production failures or network code to demonstrate them.
- [ ] Add focused tests for any nontrivial behavior introduced; choose minimal
  test tooling when needed rather than adding a broad suite preemptively.

**Done when:** cards and all catalogue states are reviewable across sizes with
mock data, and temporary requirement omissions are explicitly agreed.

## Phase 3 - Remaining page interfaces

### 3.1 Login

- [x] Create a separate LoginPage with heading.
- [x] Add labeled username/password fields and a submit control.
- [x] Label the login destination Account in desktop/mobile navigation.
- [x] Show required-field validation without sending requests.
- [x] Manage local fields and validation through React Hook Form's `useForm`.
- [x] Mask passwords by default and provide an accessible visibility toggle.
- [x] Discard form fields and errors when navigating away.
- [x] Explicitly preview success by navigating to Products without creating a session.
- [ ] Clear fields and show a red alert for incorrect credentials. The earlier
  mock-result selector was removed; real credential checking is not implemented.
- [ ] Preview pending submission and disable repeat submission while pending.
- [x] Reverify missing-field validation, whitespace-only username rejection,
  password toggle, Enter submission, and page reset after the `useForm` refactor.
- [x] Verify form controls fit without page horizontal overflow at 300, 390,
  768, and 1280px; final visual/accessibility review remains in Phase 7.

### 3.2 Cart

- [x] Create a separate CartPage with heading.
- [x] Build compact rows with image/category/title, unit price, quantity, and subtotal.
- [x] Share ProductCard between catalogue and cart with typed variant-specific
  props; replace the separate CartItemCard implementation.
- [x] Show cart total and an empty-cart state.
- [x] Omit rating, description, and Add to cart from cart rows.
- [x] Add plus/minus controls and a delete icon; minus at one removes the item.
- [x] Keep one product per row in a vertical list.
- [x] Use container queries for stacked cart-card content below 500px and
  side-by-side content at 500px and above; keep catalogue cards vertical.
- [x] Keep Buy enabled with no action as requested; explain checkout is not implemented.
- [x] Verify responsive rows at 300/390/768/1280px and browser DOM-event flows
  for additions, quantities, totals, deletion, enabled inert Buy, and empty state.
  Normal pointer/resize checks remain pending: the embedded browser was hidden
  and required dispatched click events and reloads at each viewport.
- [x] Use the existing cart list as the query container, without card wrappers.
- [x] Verify the exact 499/500/501px cart-list container threshold and a
  narrow container in a wide viewport; repeat DOM-event cart interactions and
  overflow/control-fit checks at 300/390/768/1280px after the refactor.

### 3.3 Admin

- [x] Create AdminPage and add Admin to desktop/mobile navigation.
- [x] Add MUI Slider: minimum 10, maximum 20, step 1, visible selected value.
- [x] Explain that the value controls the product count, not pagination.
- [x] Keep draft values local and apply committed values to the mock catalogue.
- [x] Bring forward local persistence as requested; default to 20.
- [x] Make Admin visible to everyone temporarily; role guards remain deferred.
- [x] Browser-verify exact 10/15/20 counts, refresh restoration, and cart retention
  when hiding product 20.
- [x] Keep settings as a numeric product limit, with no notice state or alerts.
- [x] Use minimal redux-persist configuration; omit custom transforms and error handlers.
- [x] Verify Admin menus and slider layout at 300/390/768/1280px.
- [x] Verify draft-versus-commit persistence and Home/End/arrow keyboard behavior
  with dispatched pointer/key events. Normal pointer testing remains pending
  because the shared embedded browser was hidden.

### 3.4 Navigation previews and routing

- [x] Approve URL routing in Phase 3, replacing page-selection context.
- [x] Use React Router BrowserRouter for `/products`, `/cart`, `/admin`, `/account`.
- [x] Redirect `/` to `/products` with history replacement.
- [x] Show Page not found for unmatched URLs, with a Products link.
- [x] Remove page-selection context/provider/hook; derive selection from the URL.
- [x] Use router links for menus and brand, closing the mobile drawer on selection.
- [x] Navigate valid Account preview submissions to `/products`.
- [ ] Preview anonymous, authenticated-user, and admin navigation.
- [ ] Preview guest/user identity text and Logout as an action, not a required page.
- [ ] Keep preview roles separate from actual authentication; no implied protection.
- [x] Verify refresh, direct links, Back/Forward, active styling, not-found recovery,
  cart preservation, and Account reset in the production preview via browser DOM events.
- [x] Verify mobile router links close the drawer and preserve the document.
- [x] Document the production-host SPA fallback requirement.
- [ ] Verify normal pointer interactions and the actual production host's fallback.

**Done when:** every required screen/state is reviewable without backend access.

## Phase 4 - Redux and local behavior

### 4.1 Foundation

- [x] Configure Redux Toolkit store, React Redux Provider, and typed hooks.
- [ ] Define products, cart, auth-preview/session, and settings contracts as needed.
- [ ] Add slices/selectors without API or local-storage side effects in reducers.
- [ ] Keep input state, drawer state, and slider draft state local.
- [x] Keep router/navigation state separate from business-state Redux.

### 4.2 Mock catalogue and cart behavior

- [ ] Supply catalogue data through Redux while retaining the same ProductCard API.
- [ ] Add a typed Add to cart intent; check authenticated/demo-preview eligibility.
- [x] Increment quantity on repeated additions using product identity.
- [x] Store cart display snapshots independent of currently visible products.
- [x] Reuse Product's `price` in cart snapshots instead of a separate
  `unitPriceCents` field. Share `calculateTotal` for subtotals and the cart total;
  sum cents internally, return dollars, and use `usdFormatter` directly for display.
- [x] Derive line totals and total; calculate money in integer cents.
- [x] Connect CartPage and empty state to selectors.
- [x] Add focused Node reducer tests for repeated adds, quantity controls,
  minus-at-one removal, deletion, and exact totals.
- [x] Confirm per-user persisted carts; logout hides/blocks Cart without deleting it.
- [ ] Implement user-keyed cart persistence and restore only the active user's cart.
- [ ] Hide Cart from guest navigation; guard direct access and additions.
- [ ] Test guest rejection once authentication replaces the logged-in demo assumption.

### 4.3 Settings

- [x] Choose/document an initial limit: 20.
- [x] Store only committed limit values in Redux.
- [x] Reject invalid/out-of-range/noninteger updates using explicit error behavior.
- [x] Keep slider dragging local; no API integration until later phases.
- [x] Replace manual product-limit storage/listener with redux-persist and PersistGate.
- [x] Whitelist only settings; retain the in-memory cart and local form state.
- [x] Defer cart persistence until authentication supports separate saved carts
  by stable user ID; do not add a shared browser-wide persisted cart.
- [x] Start the new persistence format at 20 without migrating the old key.
- [ ] Validate restored limits; committed-value validation alone does not cover rehydration.
- [ ] Define persistence failure handling without restoring the removed notice UI.
- [ ] Review redux-persist lifecycle serializability warnings; default middleware
  currently has no persistence-action exclusions.

**Done when:** UI interactions work through Redux with mock data and no accidental
coupling between catalogue visibility and cart contents.

## Phase 5 - API and authentication

### 5.1 Request boundary

- [ ] Add Axios after updating the dependency manifest.
- [ ] Create shared Axios client and typed products/auth API services.
- [ ] Verify actual endpoint payloads; do not assume login returns a full user.
- [ ] Add API-to-app mapping only where shapes/semantics differ.
- [ ] Implement async operations with Redux Toolkit thunks.

### 5.2 Real catalogue

- [ ] Replace mock catalogue loading with GET `/products` and a limit parameter.
- [ ] Connect pending/succeeded/failed state to Phase 2 UI.
- [ ] Connect Retry to the actual request action.
- [ ] Distinguish empty results, failures, cancellation, and stale responses.

### 5.3 Session and demo admin role

- [x] Confirm one random admin from API users, persisted across refresh/login/logout.
- [x] Confirm login survives refresh, per-user carts persist, and currency is USD.
- [ ] Define session identity metadata, validation, and invalid/expired-session handling.
- [ ] Define handling of a persisted admin ID missing from the fetched users.
- [ ] Implement POST `/auth/login`, pending state, and invalid-credentials errors.
- [ ] Persist token through a storage helper; never persist passwords.
- [ ] Surface storage failures instead of claiming persistent login succeeded.
- [ ] Restore approved session fields and handle malformed/incomplete storage.
- [ ] Fetch users and persist the initial random admin user ID outside reducers/rendering.
- [ ] Reuse that ID on refresh/login/logout and derive the role from stable user identity;
  do not present browser-local assignment as backend security.
- [ ] Let authenticated users add items; guests keep the enabled login-dialog
  action without mutating the cart. Guard actual additions in the action path.
- [ ] Enforce cart/admin route restrictions and role-aware navigation.
- [ ] Logout clears the session and active cart view, preserves stored carts/admin ID,
  hides Cart, denies additions/access, and exits protected UI.
- [ ] Test rejected login, successful login, refresh, logout, and non-admin access.

**Done when:** API and demo authentication work through thunks/services without
rewriting presentational layouts or silently swallowing failures.

## Phase 6 - Admin persistence and integration

- [x] Restore the persisted product limit before rendering through PersistGate.
- [x] Persist committed slider changes through redux-persist.
- [ ] Validate restored data and handle storage failures; custom safeguards were removed.
- [ ] Refetch with the committed integer using `/products?limit=<value>`.
- [ ] Avoid one request per drag movement.
- [ ] Ignore stale responses or cancel superseded work without false error UI.
- [ ] Make refresh restore the selected limit and use it in the first request.
- [ ] Keep admin access guarded even when navigating directly.
- [ ] Add persistent automated tests for limits, invalid data, and storage failures.
- [x] Browser-check persistence and boundaries through DOM events.
- [ ] Verify the actual network URL/params, not just displayed product count.
- [ ] Add a product to cart, lower the catalogue limit to hide it, and verify
  the cart still shows correct data/quantity/total.

**Done when:** the setting survives refresh, drives the actual request, and cannot
corrupt catalogue state or remove existing cart items.

## Phase 7 - Verification and polish

Run focused checks throughout prior phases; this is the final cross-feature pass.

- [ ] Establish a minimal test runner when behavior tests are first introduced;
  there is no configured test command today.
- [ ] Cover 3.4 -> 3 and 3.5 -> 4 stars while preserving original numeric rates.
- [ ] Cover quantities, monetary totals, empty cart, and the agreed cart lifetime.
- [ ] Cover login failure/success, restored session, logout, and admin access.
- [ ] Verify admin choice remains stable after refresh/logout and per-user saved
  carts never appear for a different account or an anonymous user.
- [ ] Cover slider boundaries, persistence errors, and stale request ordering.
- [ ] Check mobile/tablet/desktop layouts, breakpoint edges, and long real API data.
- [ ] Verify keyboard use, focus visibility/restoration, image alternatives, icon
  button names, and menu/route semantics; review earlier accessibility deferrals.
- [ ] Confirm no placeholder success behavior, leaked passwords, or real secrets.
- [ ] Run `npm run lint` and `npm run build`; document reproducible commands.
- [ ] Update overview, architecture, roadmap, and README to match delivered behavior.
- [ ] Document demo limitations and any agreed deviations from original requirements.

**Done when:** required behaviors are tested, responsive interactions verified,
and documentation accurately describes the finished demo.

## First milestone

**Responsive shell plus products UI with mock data.** The shell and cards exist,
but request-state previews and browser acceptance remain.
Do not treat mock cards alone as completion of the full products phase.
