# Learn the project in plain English

## The request-to-page flow

A visitor opens `/`. Next.js runs `app/page.jsx` on the server. It fetches products/categories from the assignment API. Server components pass those arrays as **props** to reusable components. The browser receives the rendered page and the small client components needed for interaction.

## Components and props

A component is a reusable piece of interface. `ProductCard` displays one product; `ProductGrid` maps the product array into cards. `product={p}` is a prop: the parent passes one product into the child. `Header`, `Footer` and the forms are also components.

## Server vs client components

Files under `app/` are server components by default. The API fetcher and session checker run on the server. Files beginning with `"use client"` can use browser events and React state. The catalog, header and forms need this because users click, type, sort and submit. Secrets are never sent as props; auth pages send only true/false flags indicating provider availability.

## State and events

In `components/catalog.jsx`, `useState` stores the selected sort, category and search text. `onChange` and `onClick` update that state. React redraws the filtered list. `useMemo` recalculates the displayed array when its inputs change. Filtering uses `.filter`; rendering uses `.map`; sorting copies the array before `.sort` so the original API list is not mutated.

The auth form uses state for pending requests, password visibility and form errors. Submitting prevents the browser's normal page reload, validates the values, calls Better Auth and displays the result. Buttons are disabled while a request is running.

## Effects

`RouteNotice` uses `useEffect` to show a toast after a protected redirect or social-login return. It removes the notification parameter afterward so refreshing does not repeat the toast. The date is calculated on the server in the Bangladesh timezone to avoid different initial server/browser dates.

## Context and shared authentication

The rubric's introduction lists Context API among concepts studied, but its scored requirements do not demand a custom React Context. This project uses Better Auth's shared `useSession` client store. It already updates the header when the session changes; adding a second home-made authentication state would risk inconsistency. The `Providers` wrapper mounts the single global toast surface.

## Dynamic routes

`app/category/[slug]/page.jsx` handles URLs such as `/category/sobji`. The bracketed folder is a variable. Current Next.js supplies `params` asynchronously, so the page uses `await params`. It validates the category against the API before fetching category products.

`app/product/[slug]/page.jsx` resolves a product slug and then checks the user's session before returning its protected detail interface. Unknown slugs call `notFound()`. This uses real Next.js routing, so a direct visit or refresh works on a Next.js host.

## Authentication vs protection

Authentication establishes **who** the visitor is. Better Auth hashes/checks passwords, stores users/accounts/sessions and manages cookies. A server handler under `app/api/auth/[...all]/route.js` exposes its endpoints.

Protection determines whether a particular request may see a page. `requireSession` reads the request cookies through Better Auth on the server. With no valid session it calls `redirect` to Sign In before protected content is returned. Hiding links alone would not protect a route.

Signup sets `autoSignIn:false`, so the visitor goes to Sign In. Successful email or social sign-in goes to Home, exactly as specified by the rubric. The `next` parameter records the originally requested URL for context; the current implementation intentionally follows the rubric's Home destination after login.

## Databases and migration

The market-product data stays in the external assignment API. Your database stores only authentication information. Locally, SQLite uses a file named `bazar.db`. When `DATABASE_URL` is supplied, Better Auth uses PostgreSQL instead. Migration means creating/updating the tables Better Auth needs. Run it before authentication is used on a new database.

## Profile update

`/profile` displays the server-authenticated user's name and email. Its update link goes to `/profile/edit`. The edit page checks the server session and passes the current name into `ProfileForm`. Submitting calls `authClient.updateUser({ name })`, refreshes session data and returns to Profile. This is a persistent database update, not just changing text in React state.

## Price calculations

API numbers are numeric, but the formatting helpers also understand Bengali digits. A price like `১,৮৫০ টাকা` must become `1850` before sorting; comparing display strings would produce wrong results. `bn` handles display formatting with the Bengali locale. The market average is calculated from each market's min/max midpoint and explained on the page.

## Files worth reading first

1. `app/page.jsx` — compose the homepage.
2. `components/products.jsx` — reusable cards and badges.
3. `components/catalog.jsx` — state, events, array methods, filtering and sorting.
4. `lib/api.js` — fetching with failover and errors.
5. `lib/auth.js` and `lib/session.js` — authentication and protection.
6. `components/auth-form.jsx` — user forms and OAuth.
7. `components/profile-form.jsx` — persistent profile update.
8. `app/globals.css` — design tokens and responsive breakpoints.

Explain these flows in your own words before submitting. Use the browser tests as a checklist, then personalize features you understand and commit those real changes yourself.
