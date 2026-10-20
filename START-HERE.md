# Start here — beginner guide

## 1. What you received

`bazar-dor` is a complete project folder. Keep all its files together. You do **not** need to create a new Next.js app, paste each file individually or run `create-next-app`.

The app already contains the pages and functionality. You need to install dependencies, run the setup commands, create your own OAuth credentials, and publish it on your GitHub/Vercel accounts. A complete website with Google/GitHub login cannot be made credential-free by copying code.

The course asks you to do your own work. Use the included walkthrough to understand and adapt this implementation before submitting. The eight included starter commits were made for the scaffold under a generic author, not your personal identity.

## 2. Install the two essentials

1. Install **Node.js 24 LTS** from https://nodejs.org/ (includes npm).
2. Install **Visual Studio Code** from https://code.visualstudio.com/.
3. For publishing history, install **Git** from https://git-scm.com/downloads.
4. Restart your terminal after installation.

Check in Windows Command Prompt:

```cmd
node --version
npm --version
git --version
```

## 3. Extract and open the project

1. Right-click the downloaded ZIP → **Extract All**.
2. Open the resulting `bazar-dor` folder in VS Code (**File → Open Folder**).
3. In VS Code choose **Terminal → New Terminal**. Select **Command Prompt** if PowerShell blocks `npm.ps1`.
4. Make sure the terminal is inside the folder containing `package.json`.

If the folder is in your Downloads folder, an example command is:

```cmd
cd /d "%USERPROFILE%\Downloads\bazar-dor"
```

Change that path to the folder you actually extracted.

## 4. Copy and run these commands one at a time

```cmd
npm ci
npm run setup
npm run db:migrate
npm run dev
```

Wait for each command to finish before entering the next. The final command stays running. Open **http://localhost:3000** in your browser. Stop the server with **Ctrl+C** when needed.

- `npm ci` downloads the exact dependency versions from the lockfile.
- `setup` creates `.env` with a random auth secret. It does not overwrite an existing `.env`.
- `db:migrate` creates the local Better Auth tables in `bazar.db`.
- `dev` starts your website.

Local email login needs no third-party account or database service. Accounts are stored in `bazar.db`; do not delete it if you want to retain local users. Never upload this database or `.env` to GitHub. The project ignores both.

## 5. Try the website

1. Open Home. Check six risers, six fallers and the complete catalog.
2. Press **সব পণ্য দেখুন** to scroll down.
3. Open a category, then try both price-sort orders.
4. Click a product while logged out. It should take you to Sign In with a toast.
5. Click Sign Up, enter a name, your email and a password of at least eight characters.
6. Registration takes you to Sign In. Log in using those details; you reach Home.
7. Click a product again to see market prices.
8. Click your name → **তথ্য আপডেট করুন**, change your name, submit, then refresh to confirm it persists.
9. Sign out and try opening `/profile/edit` directly. It should redirect to Sign In.

Google and GitHub buttons are wired, but cannot authenticate until you configure **both** providers. Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). The local account database is separate from the PostgreSQL database you create for deployment, so local users do not automatically exist online.

## 6. Understand the concepts

Read [docs/CODE-WALKTHROUGH.md](docs/CODE-WALKTHROUGH.md). It explains components, props, state, effects, data fetching, dynamic routing and protection using your project files.

## 7. GitHub and the eight-commit requirement

The ZIP includes a `.git` directory with the actual scaffold development history. Some file explorers hide it; you don't need to edit it. Check the history:

```cmd
git log --oneline
```

Set your own identity for **your future changes**:

```cmd
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB EMAIL"
```

Make meaningful changes that you understand, then commit each completed change:

```cmd
git add .
git commit -m "Describe the change you actually made"
```

Examples of real improvements you can make as you learn: add a relevant home description; improve search UX; add a market division filter; add a price comparison explanation; improve category metadata; refine mobile spacing; add an accessibility enhancement; finalize your project README. Do not create empty commits or describe changes you did not make. Check whether the instructor counts scaffold history; the course says you must make at least eight meaningful commits yourself.

Create an **empty** GitHub repository named `bazar-dor` (do not initialize it with another README). Copy the repository's HTTPS address, then run:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/bazar-dor.git
git push -u origin main
```

Replace `YOUR_USERNAME`. Git may ask you to sign in through a browser or credential manager. Do not paste tokens into chat.

If `git log` says this is not a repository (for example your extraction tool dropped `.git`), use the supplied bundle, located beside the project folder:

```cmd
git clone bazar-dor-history.bundle bazar-dor-from-history
cd bazar-dor-from-history
git remote remove origin
```

The cloned folder contains the same tracked project and history. Continue there, run the setup commands, and add your own remote. Do not run `git init` to manufacture eight prior commits.

## 8. Publish and submit

Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for PostgreSQL, Google, GitHub and Vercel. Then fill both links at the top of `README.md`, commit/push the README, and submit the two links required by the course.

The deadline in the provided rubric is already past as of October 21, 2026. It says after October 11 the maximum is 30 marks. Confirm whether your instructor has given you an extension or a different deadline. No code can override that rule.

## Troubleshooting

| Symptom                                 | Fix                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `npm` is not recognized                 | Install Node.js, close/reopen the terminal                                                                 |
| PowerShell says scripts are disabled    | Use Command Prompt or run `npm.cmd` instead of `npm`; no execution-policy change needed                    |
| `package.json` not found                | `cd` into the actual `bazar-dor` project folder                                                            |
| Database table is missing               | Stop server → `npm run db:migrate` → restart                                                               |
| Login fails for a new online deployment | Local SQLite users are not copied online; register on the deployed site                                    |
| Google/GitHub says service unavailable  | Add both provider credentials to `.env`, then restart; on Vercel add them and redeploy                     |
| OAuth redirect mismatch                 | Exact callback URL must match the deployed domain and `/api/auth/callback/google` or `/github`             |
| Unexpected origin / login 403           | Match `BETTER_AUTH_URL` to the origin in your address bar, including `http` locally / `https` online       |
| Port 3000 already used                  | Close other dev servers; if using a different port also update auth URL and OAuth callbacks                |
| API information does not load           | Check internet connection; app tries three supplied endpoints, then shows retry UI                         |
| Native SQLite install fails             | Use Node 24 LTS on supported Windows/macOS/Linux and rerun `npm ci`; capture the full error if it persists |
| Git remote already exists               | Use `git remote set-url origin YOUR_REPOSITORY_URL`                                                        |

For an optional browser test:

```cmd
npx playwright install chromium
npm run test:e2e
```

The acceptance tests create temporary test users in your configured database. Run them against a development database, not a database with important real data.
