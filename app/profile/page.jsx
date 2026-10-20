import Link from "next/link";
import { requireSession } from "@/lib/session";
export const metadata = { title: "আমার প্রোফাইল" };
export default async function Profile() {
  const { user } = await requireSession("/profile");
  return (
    <div className="profile-page container">
      <section className="profile-card">
        <div className="avatar-circle">
          {user.name.slice(0, 1).toUpperCase()}
        </div>
        <h1>আমার প্রোফাইল</h1>
        <p className="muted">আপনার ব্যক্তিগত তথ্য</p>
        <dl>
          <dt>নাম</dt>
          <dd>{user.name}</dd>
          <dt>ইমেইল</dt>
          <dd className="profile-email">{user.email}</dd>
        </dl>
        <Link className="btn btn-primary" href="/profile/edit">
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}
