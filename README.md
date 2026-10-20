# 🛒 বাজার দর / BazarDor

A Bengali price-tracking application for Bangladesh's everyday essentials. Built for Programming Hero **B14 Assignment 7** with Next.js App Router and Better Auth. Browse supplied API prices, compare market ranges, and manage your profile.

## Submission links — replace before submitting

- **Live site:** ADD_YOUR_DEPLOYED_URL
- **GitHub repository:** ADD_YOUR_REPOSITORY_URL

## Start here

**New to Next.js? Read [START-HERE.md](START-HERE.md).** No code needs to be pasted into separate files: this folder is the complete source project.

```bash
npm ci
npm run setup
npm run db:migrate
npm run dev
```

Open http://localhost:3000. Use Node.js 24 LTS. `setup` creates a local `.env` and a random secret. Email registration/login works with a local SQLite database after migration. Google/GitHub require your own credentials; Vercel requires PostgreSQL. Follow [DEPLOYMENT.md](docs/DEPLOYMENT.md) before submitting.

## Technologies

| Tool                                   | Purpose                                                       |
| -------------------------------------- | ------------------------------------------------------------- |
| Next.js 16 App Router / React 19       | Server-rendered pages, dynamic routes, client interactivity   |
| JavaScript                             | Readable application logic                                    |
| Tailwind CSS 4 + DaisyUI 5             | Responsive styles and UI primitives                           |
| Better Auth                            | Email/password, Google/GitHub OAuth, sessions, profile update |
| SQLite locally; PostgreSQL on Vercel   | Persistent authentication data                                |
| react-hot-toast                        | Auth, validation and protected-route feedback                 |
| Hind Siliguri                          | Locally bundled Bengali font; no Google Fonts request         |
| Playwright / Node test runner / ESLint | Browser tests, data-logic tests and lint checks               |

## Key features

1. Responsive Bengali navbar with Bangladesh date, active category links and session-aware controls.
2. Seamless repeating price ticker and supplied hero illustration; CTA scrolls to `#সব-পণ্য`.
3. Top six risers/fallers ranked by percentage magnitude, plus the complete API product catalog.
4. Category pages, category filters, product search and numeric price sorting that accepts Bengali digits.
5. Server-protected `/product/[slug]` pages with market minimum, maximum and mean prices.
6. Better Auth signup/signin/logout, persistent database sessions and Google/GitHub provider support.
7. Protected profile page and a separate `/profile/edit` route using `authClient.updateUser`.
8. Loading skeletons, pending buttons, error/retry UI, friendly 404 pages, empty search state and toasts.
9. Mobile/tablet/desktop layouts, keyboard focus styles and reduced-motion support.

## Routes

| URL                  | Access                      | Purpose                                        |
| -------------------- | --------------------------- | ---------------------------------------------- |
| `/`                  | Public                      | Hero, movers, all products                     |
| `/category/[slug]`   | Public                      | Category list and sorting                      |
| `/product/[slug]`    | Signed in                   | Product summary and all supplied market prices |
| `/signin`, `/signup` | Public                      | Authentication forms                           |
| `/profile`           | Signed in                   | User name and email                            |
| `/profile/edit`      | Signed in                   | Update name                                    |
| `/api/auth/[...all]` | Better Auth controls access | Authentication backend                         |

Invalid category/product slugs and unknown paths show the friendly 404 view. A valid protected page redirects to sign-in when logged out; a successful sign-in goes to Home, as required by the rubric. Signup goes to Sign In and does not silently log the user in.

## Data and calculations

The app uses the supplied Programming Hero API, then the two supplied alternatives if a request fails. Category products use the supplied filter endpoint. Product routes resolve a slug against `/products` because the API's single-product endpoint uses numeric IDs. No invented prices or offline fallback data are displayed. All `markets` rows are rendered. API prices are assignment data, not independently verified live market quotations. The heading “today” follows the assignment API terminology; no actual data observation date is supplied.

- Risers: positive direction sorted largest percentage first; fallers: negative direction sorted by largest absolute percentage first.
- Green up / red down / gray flat badges follow the assignment's specified colors.
- Summary minimum is the smallest market minimum; maximum is the largest market maximum.
- Average is the mean of each market's `(min + max) / 2`, rounded for display. It is labeled on the details page. API `today` is displayed separately.
- Data is fetched on the server with no persistent price cache. React request memoization avoids duplicate fetches within a render.

## Commands

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run setup`        | Creates `.env` only if it doesn't exist                        |
| `npm run db:migrate`   | Creates/migrates Better Auth tables in the configured database |
| `npm run dev`          | Development server                                             |
| `npm run build`        | Production build                                               |
| `npm start`            | Serves the production build                                    |
| `npm run lint`         | ESLint                                                         |
| `npm test`             | Bengali-number, ranking and market-summary tests               |
| `npm run format:check` | Formatting check                                               |
| `npm run test:e2e`     | Browser acceptance tests; install Chromium first               |
| `npm run check:deploy` | Checks required deployment variables without printing secrets  |

## Project map

- `app/`: pages, loading/error views and Better Auth route handler.
- `components/`: navbar, cards, catalog, auth/profile forms, toasts.
- `lib/api.js`: server-only API fetching and endpoint failover.
- `lib/auth.js`: server-only database configuration and Better Auth instance.
- `lib/session.js`: server session validation before protected content renders.
- `lib/format.mjs`: Bengali numbers, sorting, rankings and price statistics.
- `public/`: original supplied logo and hero image.
- `scripts/`: local environment setup, auth migrations, deployment checks.
- `tests/`: unit tests and browser acceptance tests.
- `docs/`: deployment, rubric mapping, walkthrough and verification notes.

## Git history and learning

The download includes the actual scaffold implementation history under the generic **BazarDor Project** author, plus an optional portable Git bundle. These are assistant-created starter commits, not evidence of your own work. Read the code, adapt it, and follow your course's authorship rules. Make and push your own meaningful changes. See [START-HERE.md](START-HERE.md) for publishing and the eight-commit requirement.

## Before submission

Follow [REQUIREMENTS.md](docs/REQUIREMENTS.md), configure both social providers and PostgreSQL, deploy, run the smoke checklist, replace the submission links above, and push your final README. Technical coverage does not guarantee a particular grade. The supplied rubric says full marks were due October 10, 2026 at 11:59 PM and caps submissions after October 11 at 30 marks; ask your instructor about your applicable deadline.

## Asset licenses

Bundled Twemoji SVGs make product/category illustrations independent of device emoji fonts. See [THIRD-PARTY-NOTICES.md](docs/THIRD-PARTY-NOTICES.md) for attribution and CC BY 4.0.

## Reference material

The original rubric is preserved in [assignment-original.md](docs/assignment-original.md). The supplied Figma/Penpot files informed the green palette, two-row navigation, ticker, card layout, auth forms and market table. This implementation includes search and profile screens beyond the design; it is not a certified pixel-perfect reproduction.

Official documentation used: [Next.js](https://nextjs.org/docs/app), [Better Auth installation](https://better-auth.com/docs/installation), [PostgreSQL](https://better-auth.com/docs/adapters/postgresql), [Google](https://better-auth.com/docs/authentication/google), [GitHub](https://better-auth.com/docs/authentication/github), [Update user](https://better-auth.com/docs/concepts/users-accounts#update-user).
