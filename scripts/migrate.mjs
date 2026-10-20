import "dotenv/config";
import { getMigrations } from "better-auth/db/migration";
import { auth } from "../lib/auth.js";
try {
 if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) throw new Error("Set DATABASE_URL to your hosted PostgreSQL URL first.");
 if (!process.env.BETTER_AUTH_SECRET) throw new Error("Run npm run setup first.");
 const { runMigrations } = await getMigrations(auth.options);
 await runMigrations(); console.log("Better Auth database tables are ready."); process.exit(0);
} catch (error) { console.error("Database setup failed:", error.message); process.exit(1); }
