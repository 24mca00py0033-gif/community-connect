// Original flat illustrations drawn with SVG, so no image files are needed.
// To use your own picture instead, replace <HeroArt /> with an <img> tag.

const FONT = "Rubik, Inter, sans-serif";

// A round "bubble" with a simple person bust inside
function Person({ id, x, y, r = 50, bg, shirt, skin = "#f3c6a5", hair = "#2b2b3a", long = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={id}>
        <circle r={r} />
      </clipPath>
      <circle r={r} fill={bg} />
      <g clipPath={`url(#${id})`}>
        {long && <rect x="-24" y="-34" width="48" height="52" rx="22" fill={hair} />}
        <path d={`M${-r} ${r} C ${-r} 16 -30 10 0 10 C 30 10 ${r} 16 ${r} ${r} Z`} fill={shirt} />
        <rect x="-7" y="-2" width="14" height="16" rx="6" fill={skin} />
        <circle cy="-16" r="19" fill={skin} />
        <path d="M-20 -18 C -21 -42 21 -42 20 -18 C 12 -30 -10 -30 -20 -18 Z" fill={hair} />
      </g>
    </g>
  );
}

// Small sparkles scattered around the art
function Confetti({ items }) {
  return items.map((s, i) => {
    const style = { animationDelay: `${(i % 5) * 0.6}s` };
    if (s.t === "plus")
      return (
        <path key={i} className="art-twinkle" style={style} d={`M${s.x - 5} ${s.y}h10M${s.x} ${s.y - 5}v10`} stroke={s.c} strokeWidth="2.5" strokeLinecap="round" />
      );
    if (s.t === "dot")
      return <circle key={i} className="art-twinkle" style={style} cx={s.x} cy={s.y} r="4" fill={s.c} />;
    if (s.t === "ring")
      return <circle key={i} className="art-twinkle" style={style} cx={s.x} cy={s.y} r="5" fill="none" stroke={s.c} strokeWidth="2" />;
    return (
      <polygon key={i} className="art-twinkle" style={style} points={`${s.x},${s.y - 6} ${s.x + 6},${s.y + 5} ${s.x - 6},${s.y + 5}`} fill={s.c} />
    );
  });
}

const heroConfetti = [
  { t: "plus", x: 214, y: 34, c: "#5b5bd6" },
  { t: "dot", x: 470, y: 90, c: "#ff7a3d" },
  { t: "ring", x: 36, y: 60, c: "#2f9e63" },
  { t: "tri", x: 480, y: 230, c: "#ffc857" },
  { t: "plus", x: 20, y: 410, c: "#ff8fa3" },
  { t: "dot", x: 330, y: 452, c: "#5b5bd6" },
  { t: "ring", x: 200, y: 450, c: "#ff7a3d" },
  { t: "tri", x: 150, y: 28, c: "#ff8fa3" },
];

// Main hero picture: people connected through a location pin
export function HeroArt() {
  return (
    <div className="hero-art">
      <svg viewBox="0 0 520 470" role="img" aria-label="People connected across a map" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="cc-shadow-a" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#5b5bd6" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* background shapes */}
        <path d="M105 430 V250 A155 155 0 0 1 415 250 V430 Z" fill="#eceaff" />
        <circle cx="118" cy="112" r="46" fill="#ffd9a0" />
        <path d="M370 445 A60 60 0 0 1 490 445 Z" fill="#bdeedd" />
        <circle className="art-ring" cx="260" cy="235" r="206" fill="none" stroke="#c9c5f5" strokeWidth="2" strokeDasharray="4 10" />

        {/* connection lines */}
        <g stroke="#9b97e8" strokeWidth="2.5" strokeDasharray="6 8" fill="none">
          <path d="M260 235 L112 150" />
          <path d="M260 235 L412 140" />
          <path d="M260 235 L96 340" />
          <path d="M260 235 L424 330" />
        </g>

        {/* location pin */}
        <g className="art-bob" filter="url(#cc-shadow-a)">
          <path d="M260 382 C215 332 190 278 190 228 A70 70 0 0 1 330 228 C330 278 305 332 260 382 Z" fill="#5b5bd6" />
          <circle cx="260" cy="228" r="29" fill="#fff" />
          <circle cx="260" cy="228" r="12" fill="#ff7a3d" />
        </g>

        {/* people */}
        <g className="art-float-a" filter="url(#cc-shadow-a)">
          <Person id="cc-p1" x={112} y={150} bg="#ffd66b" shirt="#2f9e63" hair="#2b2b3a" long />
        </g>
        <g className="art-float-b" filter="url(#cc-shadow-a)">
          <Person id="cc-p2" x={412} y={140} bg="#ff9fb3" shirt="#3b5bdb" hair="#3a2a22" />
        </g>
        <g className="art-float-c" filter="url(#cc-shadow-a)">
          <Person id="cc-p3" x={96} y={340} bg="#6fd8c8" shirt="#7c4dff" hair="#1f1f2b" long />
        </g>
        <g className="art-float-a" filter="url(#cc-shadow-a)">
          <Person id="cc-p4" x={424} y={330} bg="#ffb27a" shirt="#fbc531" skin="#e0a882" hair="#2b2b3a" />
        </g>

        {/* floating labels */}
        <g className="art-float-b" filter="url(#cc-shadow-a)">
          <rect x="300" y="36" width="104" height="46" rx="14" fill="#fff" />
          <circle cx="324" cy="59" r="12" fill="#2f9e63" />
          <text x="342" y="64" fontSize="15" fontWeight="700" fill="#1f2330" fontFamily={FONT}>CA</text>
        </g>
        <g className="art-float-c" filter="url(#cc-shadow-a)">
          <rect x="22" y="226" width="100" height="46" rx="14" fill="#fff" />
          <circle cx="46" cy="249" r="12" fill="#ff7a3d" />
          <text x="64" y="254" fontSize="15" fontWeight="700" fill="#1f2330" fontFamily={FONT}>CE</text>
        </g>
        <g className="art-float-a" filter="url(#cc-shadow-a)">
          <rect x="268" y="398" width="132" height="46" rx="14" fill="#fff" />
          <circle cx="292" cy="421" r="12" fill="#5b5bd6" />
          <text x="310" y="426" fontSize="14" fontWeight="700" fill="#1f2330" fontFamily={FONT}>Locality</text>
        </g>

        {/* plant */}
        <path d="M40 445 C30 405 55 385 70 377 C78 405 66 430 40 445Z" fill="#2f9e63" />
        <path d="M62 445 C62 410 90 397 104 397 C100 423 86 439 62 445Z" fill="#46b97a" />

        <Confetti items={heroConfetti} />
      </svg>
    </div>
  );
}

// Picture for the blue band: a search bar and a list of member rows
export function ListArt() {
  const rows = [
    { y: 110, dx: 0, bg: "#ffd9c7", shirt: "#ff7a3d", w: 130, tag: "CA", tagBg: "#dff5e9", tagFg: "#1f7a4d", cls: "art-float-a" },
    { y: 200, dx: 34, bg: "#dcd8ff", shirt: "#5b5bd6", w: 108, tag: "CE", tagBg: "#ffe9c9", tagFg: "#b45309", cls: "art-float-b" },
    { y: 290, dx: -8, bg: "#cdf3e4", shirt: "#2f9e63", w: 142, tag: "Lawyer", tagBg: "#ffd9e2", tagFg: "#be185d", cls: "art-float-c" },
  ];

  return (
    <div className="band-art">
      <svg viewBox="0 0 520 420" role="img" aria-label="Searching a list of community members" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="cc-shadow-b" x="-20%" y="-20%" width="140%" height="170%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#031a4d" floodOpacity="0.25" />
          </filter>
        </defs>

        <circle cx="270" cy="210" r="190" fill="#fff" opacity="0.08" />

        {/* search bar */}
        <g className="art-float-b" filter="url(#cc-shadow-b)">
          <rect x="110" y="26" width="300" height="50" rx="25" fill="#fff" />
          <circle cx="142" cy="50" r="9" fill="none" stroke="#0f62e0" strokeWidth="3" />
          <path d="M149 57 L157 65" stroke="#0f62e0" strokeWidth="3" strokeLinecap="round" />
          <rect x="172" y="44" width="130" height="12" rx="6" fill="#dfe3ee" />
          <rect x="316" y="38" width="82" height="26" rx="13" fill="#0f62e0" />
          <text x="357" y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily={FONT}>Search</text>
        </g>

        {/* member rows */}
        {rows.map((r) => (
          <g key={r.tag} className={r.cls} filter="url(#cc-shadow-b)">
            <g transform={`translate(${r.dx} 0)`}>
              <rect x="90" y={r.y} width="340" height="70" rx="20" fill="#fff" />
              <circle cx="130" cy={r.y + 35} r="22" fill={r.bg} />
              <circle cx="130" cy={r.y + 29} r="8" fill="#f3c6a5" />
              <path d={`M114 ${r.y + 50} C114 ${r.y + 38} 146 ${r.y + 38} 146 ${r.y + 50} Z`} fill={r.shirt} />
              <rect x="166" y={r.y + 20} width={r.w} height="10" rx="5" fill="#dfe3ee" />
              <rect x="166" y={r.y + 40} width="90" height="8" rx="4" fill="#eef0f6" />
              <rect x="350" y={r.y + 24} width="66" height="22" rx="11" fill={r.tagBg} />
              <text x="383" y={r.y + 40} textAnchor="middle" fontSize="12" fontWeight="700" fill={r.tagFg} fontFamily={FONT}>{r.tag}</text>
            </g>
          </g>
        ))}

        {/* extras */}
        <g className="art-bob">
          <circle cx="452" cy="366" r="34" fill="#ffc857" />
          <path d="M452 386 C440 372 436 366 436 360 A16 16 0 0 1 468 360 C468 366 464 372 452 386Z" fill="#5b5bd6" />
          <circle cx="452" cy="360" r="5" fill="#fff" />
        </g>
        <circle className="art-float-c" cx="62" cy="360" r="26" fill="#ff7a3d" />
        <path className="art-float-c" d="M40 352 C52 360 72 360 84 352" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />

        <Confetti
          items={[
            { t: "plus", x: 36, y: 120, c: "#fff" },
            { t: "dot", x: 486, y: 150, c: "#ffc857" },
            { t: "ring", x: 470, y: 260, c: "#fff" },
            { t: "tri", x: 40, y: 250, c: "#ffc857" },
          ]}
        />
      </svg>
    </div>
  );
}

// Small rounded icon tile for the feature cards
export function FeatureIcon({ kind, color }) {
  return (
    <svg className="feature-icon" viewBox="0 0 56 56" aria-hidden="true">
      <rect width="56" height="56" rx="18" fill={color} />
      {kind === "pin" && (
        <>
          <path d="M28 44 C20 36 16 31 16 25 A12 12 0 0 1 40 25 C40 31 36 36 28 44Z" fill="#fff" />
          <circle cx="28" cy="25" r="4.5" fill={color} />
        </>
      )}
      {kind === "career" && (
        <>
          <rect x="14" y="21" width="28" height="19" rx="5" fill="#fff" />
          <path d="M22 21 v-3 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v3" stroke="#fff" strokeWidth="3" fill="none" />
          <rect x="14" y="29" width="28" height="3" fill={color} />
        </>
      )}
      {kind === "connect" && (
        <>
          <circle cx="22" cy="28" r="9" fill="#fff" />
          <circle cx="34" cy="28" r="9" fill="#fff" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

// Logo mark: two overlapping circles = people connecting
export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="#5b5bd6" />
      <circle cx="12" cy="13" r="5.5" fill="#fff" />
      <circle cx="20.5" cy="19" r="5.5" fill="#ffc857" />
    </svg>
  );
}
