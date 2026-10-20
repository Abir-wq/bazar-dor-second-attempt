# Requirement-by-requirement checklist

“Implemented” means source is present, not that your personal deployment/OAuth accounts are already configured. No technical checklist guarantees the examiner's grade or overrides the deadline.

| Requirement                                                    | Implementation / route                                                 | Status                                                |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| Next.js App Router, React, Tailwind + component library        | `app/`, `app/globals.css`, DaisyUI                                     | Implemented                                           |
| Logo, Bengali date, two-row navbar                             | `components/header.jsx`; supplied icon; Asia/Dhaka date                | Implemented                                           |
| Active category navigation                                     | `usePathname`, `aria-current`, green chip                              | Implemented                                           |
| Auth buttons vs profile/logout                                 | Better Auth `useSession`                                               | Implemented                                           |
| Infinite price ticker                                          | Duplicated ticker groups + CSS transform                               | Implemented; reduced-motion setting pauses it         |
| Eyebrow, heading, subtitle, right hero image                   | `app/page.jsx`; original supplied image                                | Implemented                                           |
| Same-page CTA to all products                                  | Literal `href="#সব-পণ্য"`                                              | Implemented                                           |
| Top six risers                                                 | `movers(products,"up")`                                                | Implemented                                           |
| Top six fallers                                                | `movers(products,"down")`                                              | Implemented                                           |
| All products responsive grid                                   | `Catalog`, `ProductGrid`; 3–4 desktop / 2 tablet / 1 mobile            | Implemented                                           |
| Emoji, name, unit, today label, Bengali price, direction badge | `components/products.jsx`                                              | Implemented                                           |
| Green up, red down, gray flat                                  | `.change.up/down/flat`                                                 | Implemented per rubric                                |
| Dynamic detail links                                           | `/product/[slug]`                                                      | Implemented                                           |
| Protected details including direct URL and refresh             | `requireSession`, server validation before rendering detail            | Implemented                                           |
| Detail title/emoji/summary/category/unit                       | Product summary and category link                                      | Implemented                                           |
| Min/max/average                                                | All supplied market ranges; calculation explained in UI                | Implemented                                           |
| Market-specific data                                           | Every supplied `markets` row, division, min/max/mean                   | Implemented                                           |
| Category title/icon, sorting, loading, empty/invalid view      | `/category/[slug]`, route skeleton, `notFound`                         | Implemented                                           |
| Sign In form, success Home, errors, registration link          | `/signin`, `AuthForm`                                                  | Implemented                                           |
| Sign Up name/email/password, success Sign In                   | `/signup`; `autoSignIn:false`                                          | Implemented                                           |
| Better Auth email/password                                     | Database sessions + Better Auth API handler                            | Implemented; migration needed                         |
| Google + GitHub on both auth pages                             | `signIn.social` and conditional server provider config                 | Implemented; both sets of real credentials required   |
| Success/error toasts                                           | Signup/login/logout/validation/profile/OAuth return/protected redirect | Implemented                                           |
| No email verification or forgot password                       | No verification requirement; no reset flow                             | Implemented                                           |
| Footer text and two-side layout                                | `components/footer.jsx`                                                | Implemented                                           |
| Responsive navigation/hero/grid                                | `app/globals.css` media queries                                        | Implemented                                           |
| Unknown routes/products/categories                             | `app/not-found.jsx`                                                    | Implemented                                           |
| Home and category loading skeletons                            | `app/loading.jsx`, category loading route                              | Implemented                                           |
| Dynamic routes reload after deployment                         | Server-rendered Next.js, not static export                             | Implemented; verify deployed URL                      |
| C1 numeric sort incl. Bengali numerals                         | `numeric` and `sortProducts` in `lib/format.mjs`                       | Implemented; tested                                   |
| C2 README name/description/tech/5+ features                    | `README.md`                                                            | Included; replace submission links                    |
| C3 profile update on separate route                            | `/profile` → `/profile/edit` → `authClient.updateUser({name})`         | Implemented                                           |
| At least eight meaningful commits                              | Included actual starter history; make your own understood changes      | Account/course action required                        |
| Deployment with no runtime errors                              | PostgreSQL and Vercel guide                                            | Account action and live verification required         |
| Submission live + repository URLs                              | README placeholders                                                    | Fill with your URLs                                   |
| Full-mark deadline                                             | Original rubric: Oct 10, 2026 11:59 PM                                 | Instructor decision; late cap applies unless extended |

## Authentication update

The header's Login/Sign up controls now render before category/ticker data is fetched and remain visible during session lookup. Bilingual labels clarify the actions. The shared Logout button is available in the header and Profile. Auth/profile forms are disabled until their event handlers are ready and use `method="post"` to avoid a native GET submission containing credentials. Tests cover repeated login/logout, reuse of an invalidated cookie, slow session lookup and JavaScript-disabled form behavior. These improvements do not configure Google/GitHub credentials or deploy the website.

## Design notes

The Figma/Penpot files were inspected alongside the original rubric. The implementation preserves the green `#05893e` palette, pale `#f0f5f0` surfaces, supplied logo/hero assets, two-row navigation, ticker, three-column cards and market table structure. It includes additional useful search/filter controls and original profile screens. A pixel-perfect match has not been certified; review against your design file before submission.
