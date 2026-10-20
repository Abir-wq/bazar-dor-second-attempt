import Emoji from "@/components/emoji";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state not-found">
      <span>
        <Emoji symbol="🧺" />
      </span>
      <p className="eyebrow">৪০৪ • পাওয়া যায়নি</p>
      <h1>এই পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p>পণ্য, বিভাগ বা ঠিকানাটি সঠিক নয় অথবা এখানে কোনো পণ্য নেই।</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
