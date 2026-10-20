export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <p>
          <strong>বাজার দর</strong> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <div>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          <p className="asset-credit">
            ইমোজি: <a href="https://github.com/jdecked/twemoji">Twemoji</a> ·{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
