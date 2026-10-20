# Deployment — PostgreSQL, Google, GitHub and Vercel

The project source is complete. These account-specific steps must be performed on your own accounts. You need a GitHub repository, a hosted PostgreSQL database, Google OAuth credentials, GitHub OAuth credentials and a Vercel deployment. Provider/dashboard labels can change; official documentation links are at the end.

## A. PostgreSQL database for deployment

Use a hosted PostgreSQL provider such as Neon (https://neon.tech/). Create a project/database, open its connection panel and copy the **Node.js/PostgreSQL connection string**. It starts with `postgresql://` or `postgres://`. Keep the provider's SSL parameters such as `?sslmode=require` intact. A pooled connection string is suitable for the app's small pool.

In your local `.env`, set:

```dotenv
DATABASE_URL="PASTE_YOUR_REAL_POSTGRES_CONNECTION_STRING"
```

Do not literally use the placeholder above. Keep the existing `BETTER_AUTH_SECRET` that `npm run setup` generated. Stop the dev server and run:

```cmd
npm run db:migrate
```

This creates Better Auth's `user`, `session`, `account` and `verification` tables in PostgreSQL. It does not copy local SQLite accounts. The presence of a `verification` table is Better Auth's standard schema; the app does not require email verification or offer forgotten-password flows.

Now `npm run dev` uses PostgreSQL because `DATABASE_URL` is present. Create a new test account to confirm it works. Migration is deliberate and separate from `next build`; do not migrate automatically on every serverless request.

## B. Google OAuth

1. Open https://console.cloud.google.com/ and create/select a project.
2. Configure the OAuth consent screen / Google Auth Platform branding and audience.
3. Create an OAuth client with application type **Web application**.
4. Add authorized JavaScript origins for `http://localhost:3000` and your final HTTPS site domain.
5. Add this local authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

6. Add your production redirect URI after you know your site URL:

```text
https://YOUR-PROJECT.vercel.app/api/auth/callback/google
```

7. Copy the client ID and secret to `.env`:

```dotenv
GOOGLE_CLIENT_ID=YOUR_REAL_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_REAL_CLIENT_SECRET
```

8. If the OAuth app is in Testing mode, Google restricts who can log in. Add the relevant test users or move the app to an appropriate published state before examination, following Google's requirements. Verify using a different account, not just the project's owner.

Only basic identity/email/profile are requested by Better Auth. Do not add unrelated scopes.

## C. GitHub OAuth

Open https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**. Use an **OAuth App** (the simpler choice for this project).

For local development:

```text
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

Copy its client ID and generate a client secret, then set:

```dotenv
GITHUB_CLIENT_ID=YOUR_REAL_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_REAL_CLIENT_SECRET
```

For the deployed version, create a **separate GitHub OAuth App** with:

```text
Homepage URL: https://YOUR-PROJECT.vercel.app
Authorization callback URL: https://YOUR-PROJECT.vercel.app/api/auth/callback/github
```

Use the production app's credentials in Vercel and the local app's credentials in local `.env`. This avoids repeatedly changing a single callback URL. Better Auth handles the email scope. If you instead choose a GitHub App, read the official provider instructions about email permissions.

After editing `.env`, restart your dev server. Try both social buttons. Successful OAuth returns to Home and triggers a success toast. Cancellation/provider errors return to Sign In with an error toast. Do not use fabricated client IDs as a substitute for this step.

## D. Push to GitHub

Follow the Git instructions in `START-HERE.md`. Confirm that GitHub has the source folders, package files and README, and **does not** have `.env`, `bazar.db`, `.next` or `node_modules`.

## E. Vercel

1. Open https://vercel.com/ and import your GitHub repository.
2. Select **Next.js** as framework. Set the root directory to the folder containing `package.json` (normally repository root).
3. Choose Node.js **24.x**. Keep Build Command `npm run build`; Output Directory should use the framework default.
4. Add all of the following environment variables to Production. Use the same database you migrated in step A:

| Name                   | Value                                                                          |
| ---------------------- | ------------------------------------------------------------------------------ |
| `DATABASE_URL`         | Your hosted PostgreSQL connection string, including SSL parameters             |
| `BETTER_AUTH_SECRET`   | Your generated random secret, at least 32 characters                           |
| `BETTER_AUTH_URL`      | Exact final origin, e.g. `https://your-project.vercel.app` (no trailing slash) |
| `GOOGLE_CLIENT_ID`     | Google web client ID                                                           |
| `GOOGLE_CLIENT_SECRET` | Google web client secret                                                       |
| `GITHUB_CLIENT_ID`     | Production GitHub OAuth App client ID                                          |
| `GITHUB_CLIENT_SECRET` | Production GitHub OAuth App secret                                             |
| `BAZAR_API_URL`        | `https://openapi.programming-hero.com/api/bazardor`                            |

5. If you don't know the assigned URL yet, deploy once to get it; then set the final `BETTER_AUTH_URL`, update both providers' production callback URLs and **redeploy**. A first deployment without auth environment settings is not ready for submission.
6. Environment changes require a redeploy. Do not prefix secrets with `NEXT_PUBLIC_`.
7. Use one stable production domain. Preview URLs are not automatically trusted or configured for OAuth; test at the actual production URL you will submit.
8. Do not use local SQLite on Vercel: its filesystem is not a persistent user database. The code explicitly requires `DATABASE_URL` when running on Vercel.

To check settings without printing secret values, temporarily put your production settings in local `.env` and run:

```cmd
npm run check:deploy
```

Restore `BETTER_AUTH_URL=http://localhost:3000` before local browser use. Migration only needs `DATABASE_URL` and the auth secret; you can migrate the hosted database while keeping your local base URL.

## F. Production smoke test — do this before submission

Use an incognito/private window on the **deployed production URL**:

- Home, navbar, ticker and all categories load from the API.
- CTA scrolls within Home.
- Price sorting works in each direction.
- Direct `/category/sobji` visit and refresh work.
- `/category/invalid`, `/product/unknown` and `/missing-page` show the friendly 404 view.
- Logged-out `/product/sorno-machi-chal` redirects to Sign In with toast.
- Email signup → Sign In; email login → Home.
- Wrong credentials display an error; no email verification is requested.
- Both **Google** and **GitHub** authenticate and return to Home. Try a non-owner account where possible.
- Product details show all markets after login, and refresh preserves the session.
- Profile → update route → new name persists after refresh.
- Logout → protected route redirects again.
- Check mobile width 375px, tablet 768px and desktop 1440px; market table may scroll horizontally inside its container.
- No errors in browser console or Vercel runtime logs.

## G. Final submission

Replace the README placeholders with your actual live and repository URLs. Commit and push that edit. Submit both links in the assignment portal. Keep your production database and OAuth apps active so the examiner can register and log in.

Official references:

- https://better-auth.com/docs/adapters/postgresql
- https://better-auth.com/docs/authentication/google
- https://better-auth.com/docs/authentication/github
- https://better-auth.com/docs/concepts/users-accounts#update-user
- https://nextjs.org/docs/app/getting-started/deploying
