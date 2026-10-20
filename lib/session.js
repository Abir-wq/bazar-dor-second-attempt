import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
export async function requireSession(path) {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session)
    redirect(`/signin?reason=protected&next=${encodeURIComponent(path)}`);
  return session;
}
