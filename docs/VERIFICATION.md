# Authentication update verification — October 21, 2026

The updated code passed lint, formatting checks, all 3 unit tests, and a fresh production build. All **4 production browser acceptance tests passed** against a temporary PGlite PostgreSQL-compatible TCP server through the app's normal `pg` driver (about 41 seconds).

The updated tests verify:

- Registration, invalid-password feedback, login and session persistence.
- Protected product/profile pages, all market rows and persistent profile updates.
- Logout from Profile and a second logout from the header after logging in again.
- A captured pre-logout session cookie returns no authenticated session after logout.
- Login/Sign up controls remain visible while session lookup is delayed.
- A JavaScript-disabled browser receives a disabled login form using POST; passwords cannot be submitted by a native GET form.
- Catalog/category behavior and responsive layout assertions remain passing.

The account controls now render independently from market-data requests. The logout endpoint invalidates the server session, then a fresh navigation resets the client page state and shows the logout-success toast.

These tests used a production build locally; they do not confirm an actual hosted deployment, real Google/GitHub OAuth credentials, or execution of the Windows launcher on your machine. The launcher contains standard `npm.cmd` setup/start commands; follow `START-HERE.md` if a local environment error occurs.

---

# Original release verification record

Verified on October 21, 2026 (Europe/Berlin), with Node.js 24 and the committed lockfile.

| Check                                                                                                      | Result                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `npm run lint`                                                                                             | Passed                                                                    |
| `npm test`                                                                                                 | 3 tests passed: Bengali numeric sorting, mover ranking, market statistics |
| `npm run format:check`                                                                                     | Passed                                                                    |
| `npm run build`                                                                                            | Passed; all expected App Router routes generated as dynamic routes        |
| Development browser tests with local SQLite                                                                | 2 acceptance tests passed                                                 |
| Production browser tests using the `pg` driver against a temporary PGlite PostgreSQL-compatible TCP server | 2 acceptance tests passed on the final code                               |
| Desktop/mobile visual review                                                                               | Reviewed at 1440px and 375px; bundled illustrations render                |
| Responsive width assertions                                                                                | Passed at 1440px, 768px, 375px and 320px                                  |

The browser tests exercised:

- Six risers and six fallers, home anchor, category filtering and active links.
- Numeric ascending/descending category sorting and category-page refresh.
- Unknown pages, invalid categories and invalid products.
- Logged-out detail redirect and its toast.
- Form validation, registration → Sign In, invalid-password feedback, login → Home.
- Authenticated details, all 12 market rows for the sample rice product, and refresh.
- Separate profile-edit route, successful update, persistent name and header refresh.
- Logout and a subsequent protected profile-edit request.

The final production acceptance run completed in about 35 seconds. The test's invalid-password warning is expected: it intentionally submits a wrong password before checking successful login.

## Checks still requiring your accounts

Real Google/GitHub consent and token exchange have **not** been tested: no personal OAuth credentials were provided. Provider calls and callback handling are implemented, but you must configure both providers and complete actual logins before submission.

The PostgreSQL-compatible local test verifies the app's PostgreSQL driver, schema migration and session/profile operations. It does **not** validate your hosted database's network access, SSL settings or provider-specific restrictions. A Vercel deployment was not created; verify the deployed production URL using the deployment checklist.

The visual implementation follows the supplied design structure and palette, with additional search/filter controls and an illustrated emoji fallback. Pixel-perfect equivalence has not been certified.

No test user accounts, database files, `.env`, compiled output or installed dependencies are included in the download. Run the four setup commands to create your local environment.
