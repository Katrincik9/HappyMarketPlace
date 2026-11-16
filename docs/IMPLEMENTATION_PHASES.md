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
| 3. Remaining interfaces | Heading-only Cart/Login; most work pending | Shared shell and UI conventions |
| 4. Redux/local behavior | Not started; dependencies installed | Product/cart/settings UI contracts |
| 5. API/auth | Not started | Redux and agreed session/role policies |
| 6. Admin integration | Not started | Admin UI, products thunk, settings/auth |
| 7. Verification/polish | Incremental checks only; final pass pending | Relevant features implemented |

**Next proposed step:** show the original numeric product rate separately from
the review count, then build reviewable loading/error/empty states without an API.
Confirm the next step before implementation.

## Phase 1 - Visual foundation and app shell

### Implementation

- [x] Install MUI, Emotion, and MUI icons.
- [x] Enable MUI's CSS layer and establish `mui, app` ordering.
- [x] Configure primary/secondary palette, font defaults, and CssBaseline.
- [x] Define mobile spacing and shared main/footer/header containers.
- [x] Build Header, local SVG logo, navigation, and main content container.
- [x] Split mobile/desktop menus and their stylesheets.
- [x] Use navigation context/hook instead of threading navigation state as props.
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
- [x] Create four local mock products and local SVG illustrations.
- [x] Render cards inside ProductsPage's products grid.
- [x] Show image, title, description, and formatted preview USD price.
- [x] Show rounded whole stars using `Math.round`.
- [x] Show review count in parentheses.
- [ ] Show the original numeric rating alongside stars; count does not replace rate.
- [x] Keep Add to cart visible but disabled until behavior/auth exists.
- [x] Hide category and remove the login caption as explicitly requested.
- [ ] Resolve when category display should return to meet the original requirement.
- [ ] Agree anonymous action messaging without restoring the removed caption blindly.

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
- [ ] Add labeled username/password fields and a submit control.
- [ ] Show required-field validation without sending requests.
- [ ] Preview pending submission and invalid-credentials states.
- [ ] Disable repeat submission while pending; decide password visibility UX.

### 3.2 Cart

- [x] Create a separate CartPage with heading.
- [ ] Build compact rows from temporary cart data: image/title, unit price,
  quantity, and line total.
- [ ] Show cart total and an empty-cart state.
- [ ] Do not render Add to cart inside cart rows.
- [ ] Show Buy as clearly unavailable; do not simulate a purchase.
- [ ] Review responsive row/summary layout before connecting behavior.

### 3.3 Admin

- [ ] Create AdminPage and its types only as needed.
- [ ] Add MUI Slider: minimum 10, maximum 20, step 1, visible selected value.
- [ ] Explain that the value controls the catalogue request limit.
- [ ] Preview drag/committed values without persistence or API calls.

### 3.4 Navigation previews and routing

- [x] Approve URL routing in Phase 3, replacing page-selection context.
- [ ] Agree URL routes, router package, and unknown-route behavior.
- [ ] Replace current page-selection context with router-derived selection.
- [ ] Use router links for navigation, including the brand, without full reloads.
- [ ] Preview anonymous, authenticated-user, and admin navigation.
- [ ] Preview guest/user identity text and Logout as an action, not a required page.
- [ ] Keep preview roles separate from actual authentication; no implied protection.
- [ ] Verify refresh, direct links, back/forward, and active navigation indication.

**Done when:** every required screen/state is reviewable without backend access.

## Phase 4 - Redux and local behavior

### 4.1 Foundation

- [ ] Configure Redux Toolkit store, React Redux Provider, and typed hooks.
- [ ] Define products, cart, auth-preview/session, and settings contracts as needed.
- [ ] Add slices/selectors without API or local-storage side effects in reducers.
- [ ] Keep input state, drawer state, and slider draft state local.
- [ ] Keep router/navigation state separate from business-state Redux.

### 4.2 Mock catalogue and cart behavior

- [ ] Supply catalogue data through Redux while retaining the same ProductCard API.
- [ ] Add a typed Add to cart intent; check authenticated/demo-preview eligibility.
- [ ] Increment quantity on repeated additions using product identity.
- [ ] Store cart display snapshots independent of currently visible products.
- [ ] Derive item quantities, line totals, and total; calculate money in minor units.
- [ ] Connect CartPage and empty state to selectors.
- [x] Confirm per-user persisted carts; logout hides/blocks Cart without deleting it.
- [ ] Implement user-keyed cart persistence and restore only the active user's cart.
- [ ] Hide Cart from guest navigation; guard direct access and additions.
- [ ] Test repeated adds, multiple products, exact totals, and guest rejection.

### 4.3 Settings

- [ ] Choose/document an initial limit in the 10-20 range.
- [ ] Store only committed limit values in Redux.
- [ ] Reject invalid/out-of-range/noninteger updates using explicit error behavior.
- [ ] Keep slider dragging local; no API integration until later phases.

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
- [ ] Enable Add to cart only for authenticated users and guard its action path.
- [ ] Enforce cart/admin route restrictions and role-aware navigation.
- [ ] Logout clears the session and active cart view, preserves stored carts/admin ID,
  hides Cart, denies additions/access, and exits protected UI.
- [ ] Test rejected login, successful login, refresh, logout, and non-admin access.

**Done when:** API and demo authentication work through thunks/services without
rewriting presentational layouts or silently swallowing failures.

## Phase 6 - Admin persistence and integration

- [ ] Read and validate persisted product limit during initialization.
- [ ] Persist committed slider changes; display an error if saving fails.
- [ ] Refetch with the committed integer using `/products?limit=<value>`.
- [ ] Avoid one request per drag movement.
- [ ] Ignore stale responses or cancel superseded work without false error UI.
- [ ] Make refresh restore the selected limit and use it in the first request.
- [ ] Keep admin access guarded even when navigating directly.
- [ ] Verify 10 and 20 boundaries, intermediate integers, and invalid stored data.
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
but request-state previews, original numeric rating, and browser acceptance remain.
Do not treat mock cards alone as completion of the full products phase.
