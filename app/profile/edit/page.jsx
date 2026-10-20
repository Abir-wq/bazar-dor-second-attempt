import { requireSession } from "@/lib/session";
import ProfileForm from "@/components/profile-form";
export const metadata={title:"তথ্য আপডেট"};
export default async function Edit(){const {user}=await requireSession("/profile/edit");return <div className="profile-page container"><ProfileForm initialName={user.name}/></div>;}
