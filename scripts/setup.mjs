import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
if (!existsSync(".env")) {
 const content = readFileSync(".env.example", "utf8").replace("BETTER_AUTH_SECRET=", `BETTER_AUTH_SECRET=${randomBytes(48).toString("base64url")}`);
 writeFileSync(".env", content); console.log("Created .env with a secure secret. Next: npm run db:migrate, then npm run dev.");
} else console.log(".env exists; kept your settings. Next: npm run db:migrate.");
