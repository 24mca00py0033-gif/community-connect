// Soft background + text color pairs used for initials avatars and card tops
const palette = [
  ["#ffe1d3", "#c2410c"],
  ["#e0dcff", "#4338ca"],
  ["#d3f5e6", "#047857"],
  ["#ffeeb8", "#a16207"],
  ["#ffd6e1", "#be185d"],
  ["#d6e8ff", "#1d4ed8"],
];

export function colorFor(text = "") {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

export function fullName(p = {}) {
  return `${p.name || ""} ${p.lastName || ""}`.trim();
}

// Shows the photo, or colored initials when there is none
export default function Avatar({ src, name = "", size = 84 }) {
  const [bg, fg] = colorFor(name);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const box = { width: size, height: size };

  if (src) {
    return <img className="avatar" style={box} src={src} alt={name} />;
  }
  return (
    <div className="avatar" style={{ ...box, background: bg, color: fg, fontSize: size * 0.36 }}>
      {initials || "?"}
    </div>
  );
}
