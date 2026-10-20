import Image from "next/image";
const supported = new Set([
  "1f9c5",
  "1f95b",
  "1fad9",
  "1fada",
  "1f986",
  "1f420",
  "1f356",
  "1f336",
  "1f9c4",
  "1f9fa",
  "1f357",
  "1f96c",
  "1f41f",
  "1f990",
  "1f6d2",
  "1f954",
  "1f95a",
  "1f35a",
  "1f6e2",
  "1f346",
  "1f9c8",
  "1f963",
  "1f7e2",
  "1f343",
  "1f969",
  "1f4e1",
  "1fad8",
]);
// Bundled Twemoji illustrations avoid relying on a device's emoji fonts.
export default function Emoji({ symbol }) {
  const code = Array.from(symbol)
    .filter((c) => c.codePointAt(0) !== 0xfe0f)
    .map((c) => c.codePointAt(0).toString(16))
    .join("-");
  if (!supported.has(code)) return <span>{symbol}</span>;
  return (
    <Image
      src={`/emoji/${code}.svg`}
      width={36}
      height={36}
      className="emoji-icon"
      alt={symbol}
      unoptimized
    />
  );
}
