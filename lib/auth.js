import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";
import pg from "pg";
function database() {
 if (globalThis.bazarDatabase) return globalThis.bazarDatabase;
 const db = process.env.DATABASE_URL || process.env.NODE_ENV === "production"
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 10000 })
  : new Database("bazar.db");
 if (db instanceof Database) { db.pragma("journal_mode = WAL"); db.pragma("foreign_keys = ON"); }
 globalThis.bazarDatabase = db; return db;
}
export const auth = betterAuth({
 appName: "বাজার দর", database: database(),
 baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
 secret: process.env.BETTER_AUTH_SECRET,
 emailAndPassword: { enabled: true, requireEmailVerification: false, autoSignIn: false, minPasswordLength: 8 },
 socialProviders: {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } } : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } } : {}),
 }, plugins: [nextCookies()],
});
