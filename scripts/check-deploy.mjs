import "dotenv/config";
const required = [
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing deployment settings:", missing.join(", "));
  process.exit(1);
}
if (process.env.BETTER_AUTH_SECRET.length < 32) {
  console.error("Auth secret must be at least 32 characters.");
  process.exit(1);
}
try {
  const origin = new URL(process.env.BETTER_AUTH_URL);
  if (origin.protocol !== "https:" || origin.hostname === "localhost")
    throw new Error("BETTER_AUTH_URL must be your public HTTPS origin.");
  if (origin.pathname !== "/" || origin.search || origin.hash)
    throw new Error("BETTER_AUTH_URL must contain only the site origin.");
  const db = new URL(process.env.DATABASE_URL);
  if (!["postgres:", "postgresql:"].includes(db.protocol))
    throw new Error("DATABASE_URL must be a PostgreSQL URL.");
  console.log(
    "Required settings are present. This checks formatting only; verify database access and both real OAuth logins on your deployed site.",
  );
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
