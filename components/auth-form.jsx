"use client";
import Emoji from "@/components/emoji";
import { useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
export default function AuthForm({ mode, providers }) {
  const signup = mode === "signup";
  const hydrated = useHydrated();
  const router = useRouter();
  const [busy, setBusy] = useState(false),
    [show, setShow] = useState(false),
    [error, setError] = useState("");
  function fail(message) {
    setError(message);
    toast.error(message);
  }
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim(),
      email = String(form.get("email") || "").trim(),
      password = String(form.get("password") || "");
    if (signup && (name.length < 2 || name.length > 80))
      return fail("নাম ২ থেকে ৮০ অক্ষরের মধ্যে লিখুন।");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return fail("সঠিক ইমেইল ঠিকানা লিখুন।");
    if (password.length < 8) return fail("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
    setBusy(true);
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error)
        throw new Error(result.error.message || "আবার চেষ্টা করুন।");
      if (!signup)
        await authClient.getSession({ query: { disableCookieCache: true } });
      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।"
          : "সফলভাবে সাইন ইন হয়েছে।",
      );
      router.push(signup ? "/signin" : "/");
      router.refresh();
    } catch (e) {
      fail(e.message || "সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  async function social(provider) {
    if (!providers[provider])
      return fail(
        `${provider === "google" ? "Google" : "GitHub"} লগইন এই মুহূর্তে চালু নেই। ইমেইল দিয়ে সাইন ইন করুন।`,
      );
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/?notice=social",
        errorCallbackURL: "/signin?error=social",
      });
      if (result.error) throw new Error(result.error.message);
    } catch (e) {
      fail(e.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে।");
      setBusy(false);
    }
  }
  return (
    <section className="auth-card">
      <div className="auth-icon">
        <Emoji symbol="🛒" />
      </div>
      <h1>{signup ? "সাইন আপ / Create account" : "সাইন ইন / Login"}</h1>
      <p className="muted">
        {signup
          ? "বাজার দর জানতে আমাদের সঙ্গে যুক্ত হোন।"
          : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}
      </p>
      <form method="post" onSubmit={submit} noValidate>
        {signup && (
          <label>
            নাম
            <input
              disabled={!hydrated}
              name="name"
              className="input input-bordered"
              autoComplete="name"
              placeholder="আপনার পুরো নাম"
              required
              minLength={2}
              maxLength={80}
            />
          </label>
        )}
        <label>
          ইমেইল
          <input
            disabled={!hydrated}
            name="email"
            className="input input-bordered"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          পাসওয়ার্ড
          <div className="password-field">
            <input
              disabled={!hydrated}
              name="password"
              className="input input-bordered"
              type={show ? "text" : "password"}
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder="অন্তত ৮ অক্ষর"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="btn btn-primary full-width"
          disabled={busy || !hydrated}
        >
          {busy && <span className="loading loading-spinner loading-xs" />}
          {busy ? "অপেক্ষা করুন…" : signup ? "রেজিস্টার করুন" : "সাইন ইন করুন"}
        </button>
      </form>
      <div className="divider">অথবা</div>
      <div className="social-buttons">
        <button
          className="btn btn-outline"
          disabled={busy || !hydrated}
          onClick={() => social("google")}
        >
          <span className="google-g">G</span> Google
        </button>
        <button
          className="btn btn-outline"
          disabled={busy || !hydrated}
          onClick={() => social("github")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>{" "}
          GitHub
        </button>
      </div>
      <p className="auth-switch">
        {signup ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link href={signup ? "/signin" : "/signup"}>
          {signup ? "সাইন ইন" : "সাইন আপ"}
        </Link>
      </p>
    </section>
  );
}
