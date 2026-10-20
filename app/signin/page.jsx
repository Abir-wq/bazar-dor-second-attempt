import AuthForm from "@/components/auth-form";
export const metadata = { title: "সাইন ইন" };
export default function Page() {
  return (
    <div className="auth-page">
      <AuthForm
        mode="signin"
        providers={{
          google: Boolean(
            process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
          ),
          github: Boolean(
            process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET,
          ),
        }}
      />
    </div>
  );
}
