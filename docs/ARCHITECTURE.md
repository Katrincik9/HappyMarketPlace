# Architecture and decisions

Read the [overview](PROJECT_OVERVIEW.md) for scope and the
[roadmap](IMPLEMENTATION_PHASES.md) for implementation status.
This describes both existing code and intended boundaries; planned modules below
must not be treated as already implemented.

## 1. Interpretation of the supplied diagram

The supplied diagram places **App (React + Redux)** and **Services / API Services**
inside the frontend, with a separate backend. It lists Products, Auth, Admin, and
Cart as service areas and shows `AppUser` and `ApiUser` at the mapping boundary.

```text
Frontend
  React pages/components + Redux
        |
        | dispatch thunk
        v
  Thunk coordinates API/supporting services
        |
        v
  API service -> Axios client -> Backend (Fake Store API)
        |
        | response -> optional API-to-app mapping -> fulfilled/rejected action
        v
  Reducer -> Redux state -> selector -> React UI

  Supporting storage service <-> local storage
  (called outside reducers, through agreed coordination/persistence code)
```

Services are browser-side modules, not a second backend. The diagram does not
require an HTTP endpoint for every feature: the cart is local Redux behavior,
and admin limit changes call the products API. Do not invent `/admin` requests.

## 2. Current structure

```text
src/
  App.tsx                         shared layout and Routes
  main.tsx                        styling/theme/Redux providers, PersistGate, BrowserRouter
  theme.ts                        MUI design defaults
  assets/                         logo and sample product SVGs
  components/
    header/                       Header, DesktopNavigation, MobileNavigation
    pages/                        ProductsPage, CartPage, LoginPage, AdminPage, NotFoundPage
    productCard/                  shared catalogue/cart ProductCard and container-query CSS
  constants/                      mockProducts and navigationItems
  hooks/                          typed Redux hooks
  types/                          navigation types; Product and CartItem in productTypes
  store/                          Redux store, cart/settings slices, redux-persist config
  services/                       cart total calculation and USD formatting
```

### Current UI communication

- `main.tsx` wraps BrowserRouter/App in Redux Provider and PersistGate, waiting
  for saved settings before rendering.
- `App` defines Routes inside the shared header/main/footer layout.
- Header uses Link; both menus render MUI ListItemButton as NavLink. Menu items
  contain URL paths. Selection is derived with useLocation/matchPath, while
  NavLink supplies `aria-current` for the active page.
- `Header` uses MUI `useMediaQuery` to mount one menu at the desktop breakpoint.
- Mobile navigation owns `menuOpen`. Desktop switching unmounts the drawer,
  resetting its state; scroll-lock/backdrop cleanup needs browser regression tests.
- ProductsPage maps the first `settings` samples (the numeric product limit) to `ProductCard`
  props. There are 20 distinct mock entries reusing four local illustrations.
- AdminPage owns the slider draft and dispatches committed integer changes.
  redux-persist wraps the combined root reducer with a settings-only whitelist;
  reducers never access storage. PersistGate waits for restoration before the
  first app render. Settings state is a number, not an object; its reducer
  validates committed limits and returns the new number.
  The minimal persistence config contains only the key, storage adapter, and
  settings whitelist. There is no restoration transform, custom error middleware,
  or `writeFailHandler`. Restored settings are not validated by the slice reducer.
  Redux Toolkit's default middleware remains enabled without persistence-action
  exclusions; lifecycle serializability warnings still need review.
  No settings notice state or alerts are present.
- LoginPage is labeled Account in navigation. React Hook Form's `useForm`
  manages local field values and required-field errors; `register` connects MUI
  inputs through `inputRef`. Password visibility remains component state.
  Switching pages unmounts the form and discards its state. Valid submission
  uses useNavigate to open `/products` without checking credentials or creating a session.
  The mock-result selector was removed; invalid-credentials handling is pending.
- Both pages render ProductCard with a typed `variant` prop. The `catalogue`
  variant receives a Product, shows rating/description, and dispatches `addItem`.
  The `cart` variant receives a CartItem snapshot and dispatches quantity/removal
  actions. Image, category, title, and unit-price markup are shared; cart items
  do not need catalogue-only fields. CartPage selects items and the derived total.
- ProductCard renders a single article root without a wrapper. The cart list
  establishes the named inline-size container for its cards. Cart cards stack
  image and details in narrow containers and place them side by side in wider
  containers, independent of viewport width. The cart remains one item per list
  row, and catalogue cards remain vertical.
- For this approved preview, assume a logged-in demo user. No real session or
  guest checks exist yet; restore the guest login dialog when auth is connected.
- `main.tsx` provides the Redux store. Cart stores only display snapshots,
  including Product's `price` in dollars, and quantities. It survives page
  changes but not refresh. The shared `calculateTotal` helper sums integer
  cents internally and returns dollars for both line subtotals and the cart
  total. Individual prices are formatted directly with `usdFormatter`.

API services and route access guards are not implemented. Cart and Admin remain
unrestricted previews, not authenticated routes.

### URL routes and deployment

| URL | Result |
| --- | --- |
| `/` | Redirect to `/products` with history replacement |
| `/products` | ProductsPage |
| `/cart` | CartPage |
| `/admin` | AdminPage |
| `/account` | LoginPage, labeled Account in navigation |
| Any unmatched URL | NotFoundPage with a Products link; retain the requested URL |

Use the `react-router` package in declarative BrowserRouter mode. The former
NavigationContext, NavigationProvider, and custom useNavigation hook are removed.
Links, logo navigation, and the Account form redirect stay within the same
document, preserving Redux state. Leaving Account unmounts and resets the form.
Clicking a mobile link also closes the drawer.

BrowserRouter requires the production host to return `index.html` for app paths,
including unknown paths, while serving actual assets normally. Vite development
and preview servers provide this SPA fallback; verify the real hosting setup.
Restart a running Vite server after installing the router if it cached the
dependency as missing.

## 3. State ownership decisions

| State | Owner | Reason |
| --- | --- | --- |
| URL/current page | React Router | Supports refresh, links, and history; access guards remain future work |
| Drawer visibility | MobileNavigation local state | Temporary state used by one component |
| Form fields, password visibility | Local component state | UI-only input state; never persist passwords |
| Products/request status | Redux, planned | Shared data and asynchronous lifecycle |
| Auth/token/demo role | Redux, planned | Shared access and session state |
| Cart | Redux, in memory only | Quantities and totals shared across pages; total derived in cents |
| Committed product limit | Redux settings slice | Shared persisted setting; limits mocks now, API later |
| Slider draft during dragging | AdminPage local state | Apply/persist only on committed changes |

Do not maintain a second page-selection state alongside the URL, whether in
context or Redux. Router state and business state have separate responsibilities.

## 4. Planned Redux and service responsibilities

Use `configureStore`, typed Redux hooks, `createSlice`, and `createAsyncThunk`.
The default Redux Toolkit middleware includes thunk. Keep async API calls in
thunks/services rather than components. Do not use RTK Query instead of the
required thunk-based flow.

- **Components:** render data, collect input, dispatch intents, select state.
- **Thunks:** coordinate requests and state, propagate meaningful errors, manage
  stale/cancelled requests where needed.
- **API services:** own endpoint paths, parameters, Axios request/response types.
  Return data or errors; do not dispatch, navigate, or render notifications.
- **Axios client:** one shared base configuration. Add token/interceptor behavior
  only if an actual endpoint requires it.
- **Reducers:** deterministic state transitions; no HTTP, storage, or randomness.
- **Selectors:** derive authentication checks, cart quantities, and totals.
- **Storage service:** read/write/remove approved persisted fields, validate input,
  and surface persistence failures. Storage is not a second live state store.

Suggested future modules (create only when needed):

```text
src/store/                 store, typed hooks, slices, thunks, selectors
src/services/api/          client, productsApi, authApi
src/services/storage/      session and settings storage helpers
```

These are recommended boundaries, not a requirement to create empty scaffolding.
API/storage implementation and test naming can follow the repository's patterns
as they emerge.

### Planned state shape

- `products`: items, request status/error, request identity if used for stale guards.
- `auth`: token, available user identity, demo role, status/error.
- `cart`: product ID, required display snapshot, unit price, quantity per item.
- `settings`: committed integer product limit.

Store enough cart display data to survive catalogue limit changes. Do not remove
cart entries merely because the latest products response no longer includes them.
Derive totals from item quantities, using integer minor currency units for money
calculations; do not maintain a separately mutable total.
Persist carts by stable user ID. On logout, clear the active in-memory view and
block access/additions, but preserve saved carts; account switching restores only
the new user's cart. Wait for session restoration before selecting a saved cart.
This is future behavior: for now keep `whitelist: ['settings']`. Simply adding
`cart` would save one shared browser cart, not separate user carts. Removing the
whitelist would also opt future root slices into persistence unintentionally.

## 5. API models versus application models

`ApiUser` describes the backend payload; `AppUser` describes frontend needs.
Map at the service boundary when field names, nesting, or semantics differ.
Do not expose password fields in application session state.

Fake Store API login returns a token, not a full user record or admin role.
Use a login-response type; do not assume the diagram's `ApiUser` comes from login.
The confirmed admin policy requires fetching users to choose one random user ID
and persisting that choice. Verify the users response and how a successful login
maps to a stable user ID; do not infer identity merely from submitted credentials
or retain API password fields. The demo role is frontend-assigned and cannot
provide real authorization.

The existing Product type follows the product payload fields, including
`rating.rate` and `rating.count`. Reuse it if suitable; do not duplicate identical
API/app types just to create a mapping layer. Validate important response
assumptions and keep error handling explicit.

## 6. Styling and responsive decisions

- MUI components provide common interaction/styling primitives; native HTML is
  appropriate for simple semantic structures. Avoid unnecessary wrappers.
- The theme defines shared palette, typography, and shape defaults.
  Component CSS handles layout and specific overrides. Read `src/theme.ts` for
  current values rather than treating copied design tokens as requirements.
- `StyledEngineProvider enableCssLayer` plus layer order `mui, app` makes normal
  app-layer declarations outrank normal MUI-layer declarations. Unlayered normal
  styles outrank both; avoid accidental unlayered overrides and routine `!important`.
- `CssBaseline` supplies theme-aware global defaults; avoid duplicating its reset.
- Keep Header, MobileNavigation, DesktopNavigation, and ProductCard CSS next to
  their components. Shared page heading styles are in `components/pages/Pages.css`.
- Header/main/footer use aligned `maxWidth="lg"` containers
  with explicit CSS padding rather than MUI gutters.

### Responsive guidance for future changes

Responsive design is already implemented in general terms; future work should
extend it, not rebuild the shell by default.

- Use the mobile layout as the base, with a compact brand and drawer navigation.
- The current tablet breakpoint is 600px: increase logo size and breathing room.
- The current desktop breakpoint is 900px: replace the drawer trigger with inline
  navigation. Keep the media query selecting the menu consistent with the layout.
- These breakpoints are implementation choices, not immutable design requirements.
  Discuss changes first and test just below, at, and above any revised threshold.
- Keep header, content, and footer horizontally aligned on all screen sizes.
- Let the product grid fit columns to available space. The intended progression
  is roughly 1-2 cards on mobile, 2-3 on tablet, and 3-5 on larger screens.
  Preserve readable cards rather than forcing counts on insufficient space.
- The grid currently uses `auto-fill`, preserving empty slots when products are few.
- Verify menu resize cleanup, long content, and horizontal overflow after changes.
  Dimensions, gaps, and exact sizing belong in source CSS, not a fixed-value
  documentation snapshot.

## 7. Persistence, authorization, and errors

- Required persistence: login token with minimum user identity metadata, separate
  carts by user ID, selected admin user ID, and product limit. Only the product
  limit is implemented using redux-persist under `persist:happy-marketplace`.
  Only the numeric `settings` slice and redux-persist metadata are stored.
  Cart remains in memory. The old `happy-marketplace.product-limit` key is
  ignored, not migrated; the new format starts at 20 as agreed. Other persisted
  session/cart data remains future work.
- Restore login on refresh and resolve the user's cart/role before exposing
  protected UI. Validate stored session data; define invalid/expired handling
  explicitly before implementation.
- After successful non-empty users loading, reuse the stored admin ID when valid;
  otherwise select randomly only under an agreed missing/invalid-ID policy.
  A first-time selection is persisted and must survive refresh and logout.
  This is browser-local: clearing storage permits reselection, and different
  browsers do not share the role assignment.
- Logout removes the active session, hides Cart, blocks cart routes/actions,
  and clears the active cart view. Preserve stored per-user carts and admin ID.
- The reducer accepts only integer committed limits from 10 to 20 and rejects
  invalid updates with a RangeError. Missing saved settings use the initial 20.
  Validation on restoration and explicit persistence-failure handling remain
  pending; do not assume reducer validation also checks rehydrated state.
- Admin is visible to everyone during this approved preview. Real role selection
  and access checks remain required later.
- Route guards and guarded actions must accompany hidden/disabled UI controls.
  Client-side roles are demo restrictions, not a secure backend boundary.
- A failed request must produce a visible error/retry path, not an empty
  success-shaped result. Treat intentionally aborted/stale work distinctly.
- Never store passwords or use arbitrary user tokens as evidence of real security.

## 8. Verification boundaries

No automated test framework is currently configured. Verify limits, restoration,
malformed storage, invalid updates, and storage failures when changing settings.
Normal persistence has been browser-checked; the removed restoration/error
safeguards must not be counted as current functionality.

Test reducers/selectors and async outcomes, not MUI or React internals.
Cover rounding thresholds, quantities/money, auth transitions, slider limits,
and stale results. Browser checks must cover breakpoint boundaries, long product
content, menu selection, resize while open, and scroll-lock cleanup.
No broader automated behavior test framework exists yet; see Phase 7 and incremental checks
in the [roadmap](IMPLEMENTATION_PHASES.md).
