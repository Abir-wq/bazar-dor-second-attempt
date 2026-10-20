"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function LogoutButton({ className = "btn btn-outline btn-sm" }) {
  const [busy, setBusy] = useState(false);
  async function logout() {
    if (busy) return;
    setBusy(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message);
      // A fresh document clears client router state from the signed-in session.
      // Show the success toast on the destination so navigation cannot erase it.
      window.location.replace("/?notice=logout");
    } catch (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setBusy(false);
    }
  }
  return (
    <button
      className={className}
      onClick={logout}
      disabled={busy}
      aria-label="সাইন আউট"
    >
      <LogOut size={15} />
      <span className="auth-label">
        {busy ? "অপেক্ষা করুন" : "সাইন আউট"}
        <small>{busy ? "Please wait" : "Logout"}</small>
      </span>
    </button>
  );
}
