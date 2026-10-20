"use client";
import Link from "next/link";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import LogoutButton from "@/components/logout-button";
export default function Header({ date }) {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="site-header">
      <div className="container header-top">
        <Link href="/" className="brand" aria-label="বাজার দর হোম">
          <Image src="/logo-icon.png" width={32} height={32} alt="" />
          <span>
            <strong>বাজার দর</strong>
            <small>{date}</small>
          </span>
        </Link>
        <div className="auth-nav" aria-busy={isPending}>
          {session ? (
            <>
              <Link
                href="/profile"
                className="btn btn-ghost btn-sm profile-link"
              >
                <UserRound size={16} />
                <span className="user-name">{session.user.name}</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm"
                aria-label="সাইন ইন"
              >
                <span className="auth-label">
                  সাইন ইন<small>Login</small>
                </span>
              </Link>
              <Link
                href="/signup"
                className="btn btn-primary btn-sm"
                aria-label="সাইন আপ"
              >
                <span className="auth-label">
                  সাইন আপ<small>Sign up</small>
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
