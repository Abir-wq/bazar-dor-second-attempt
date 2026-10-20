"use client";
export default function ErrorPage({ reset }) { return <div className="container empty-state"><span>📡</span><h1>তথ্য লোড করা যায়নি</h1><p>সংযোগ বা সেবায় সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।</p><button className="btn btn-primary" onClick={reset}>আবার চেষ্টা করুন</button></div>; }
