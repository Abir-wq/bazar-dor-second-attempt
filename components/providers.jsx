"use client";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
export function Providers({ children }) { return <>{children}<Toaster position="top-center" toastOptions={{ duration: 4000, style: { fontFamily: "inherit", borderRadius: "12px" } }}/></>; }
export function RouteNotice() {
 const params = useSearchParams(); const router = useRouter(); const shown = useRef(false);
 useEffect(() => {
  if(shown.current) return;
  const reason = params.get("reason"), notice = params.get("notice"), error = params.get("error");
  if (reason === "protected") toast.error("বিস্তারিত দেখতে প্রথমে সাইন ইন করুন।", { id: "protected" });
  else if (notice === "social") toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "social" });
  else if (error) toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", { id: "social-error" });
  else return;
  shown.current = true;
  const clean = new URL(window.location.href); ["reason","notice","error","error_description"].forEach(k => clean.searchParams.delete(k));
  router.replace(clean.pathname + clean.search, { scroll: false });
 }, [params, router]);
 return null;
}
