"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LogOut, UserRound } from "lucide-react";
export default function Header({ categories }) {
 const pathname = usePathname(); const router = useRouter(); const { data: session, isPending } = authClient.useSession();
 const [date,setDate] = useState("বাংলাদেশের নিত্যপণ্যের দাম"); const [busy,setBusy] = useState(false);
 useEffect(() => { setDate(new Intl.DateTimeFormat("bn-BD", { dateStyle: "full", timeZone: "Asia/Dhaka" }).format(new Date())); }, []);
 async function logout() {
  setBusy(true);
  try { const r = await authClient.signOut(); if(r.error) throw new Error(r.error.message); toast.success("সফলভাবে সাইন আউট হয়েছে।"); router.push("/"); router.refresh(); }
  catch(e) { toast.error(e.message || "আবার চেষ্টা করুন।"); } finally { setBusy(false); }
 }
 return <header className="site-header"><div className="container header-top"><Link href="/" className="brand" aria-label="বাজার দর হোম"><Image src="/logo-icon.png" width={32} height={32} alt=""/><span><strong>বাজার দর</strong><small>{date}</small></span></Link><div className="auth-nav">{isPending ? <span className="skeleton auth-skeleton" aria-label="প্রোফাইল লোড হচ্ছে"/> : session ? <><Link href="/profile" className="btn btn-ghost btn-sm"><UserRound size={16}/><span className="user-name">{session.user.name}</span></Link><button className="btn btn-outline btn-sm" onClick={logout} disabled={busy}><LogOut size={15}/><span>{busy ? "অপেক্ষা করুন" : "সাইন আউট"}</span></button></> : <><Link href="/signin" className="btn btn-ghost btn-sm">সাইন ইন</Link><Link href="/signup" className="btn btn-primary btn-sm">সাইন আপ</Link></>}</div></div><nav className="category-nav" aria-label="পণ্যের বিভাগ"><div className="container nav-links">{categories.map(c => <Link href={`/category/${c.slug}`} key={c.slug} aria-current={pathname === `/category/${c.slug}` ? "page" : undefined} className={`category-chip ${pathname === `/category/${c.slug}` ? "active" : ""}`}><span>{c.icon}</span>{c.nameBn}</Link>)}</div></nav></header>;
}
