"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfileForm({ initialName }) {
 const [name,setName]=useState(initialName),[busy,setBusy]=useState(false),[error,setError]=useState("");const router=useRouter();
 async function update(e){e.preventDefault();if(busy)return;setError("");const value=name.trim();if(value.length<2 || value.length>80){setError("নাম ২ থেকে ৮০ অক্ষরের মধ্যে লিখুন।");toast.error("নাম ২ থেকে ৮০ অক্ষরের মধ্যে লিখুন।");return;}setBusy(true);
 try{const result=await authClient.updateUser({name:value});if(result.error)throw new Error(result.error.message);await authClient.getSession({query:{disableCookieCache:true}});toast.success("আপনার তথ্য আপডেট হয়েছে।");router.push("/profile");router.refresh();}
 catch(e){setError(e.message || "আপডেট করা যায়নি।");toast.error(e.message || "আপডেট করা যায়নি।");}finally{setBusy(false);}}
 return <section className="profile-card"><p className="eyebrow">আমার প্রোফাইল</p><h1>তথ্য আপডেট করুন</h1><form onSubmit={update} noValidate><label>নাম<input name="name" className="input input-bordered" value={name} onChange={e=>setName(e.target.value)} autoComplete="name" maxLength={80} required/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="btn btn-primary full-width" disabled={busy}>{busy ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}</button><Link className="btn btn-ghost full-width" href="/profile">ফিরে যান</Link></form></section>;
}
