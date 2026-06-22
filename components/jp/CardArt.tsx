"use client";

type Motif = "sun" | "moon" | "cloud" | "sparkle" | "bubble" | "city" | "lantern";
interface Scene {
  sky: [string, string, string];
  glow: string; hill: string; particle: string; motif: Motif;
  outfit: [string, string]; ribbon: string;
}

const SCENES: Record<string, Scene> = {
  greeting: { sky:["#fda4af","#fdba74","#fde68a"], glow:"#fff7ed", hill:"#e11d48", particle:"#fff7ed", motif:"sun",     outfit:["#4D86D4","#2A4B8D"], ribbon:"#FF80AB" },
  people:   { sky:["#a78bfa","#c4b5fd","#ddd6fe"], glow:"#f5f3ff", hill:"#6d28d9", particle:"#f5f3ff", motif:"cloud",   outfit:["#7c3aed","#4c1d95"], ribbon:"#FF80AB" },
  number:   { sky:["#38bdf8","#7dd3fc","#bae6fd"], glow:"#f0f9ff", hill:"#0369a1", particle:"#f0f9ff", motif:"bubble",  outfit:["#0284c7","#0c4a6e"], ribbon:"#FFD54F" },
  time:     { sky:["#1e293b","#334155","#64748b"], glow:"#fde68a", hill:"#0f172a", particle:"#fef9c3", motif:"moon",    outfit:["#1d4ed8","#1e3a8a"], ribbon:"#FFD54F" },
  food:     { sky:["#34d399","#6ee7b7","#bbf7d0"], glow:"#f0fdf4", hill:"#047857", particle:"#f0fdf4", motif:"cloud",   outfit:["#059669","#064e3b"], ribbon:"#FF80AB" },
  place:    { sky:["#2dd4bf","#5eead4","#99f6e4"], glow:"#f0fdfa", hill:"#0f766e", particle:"#f0fdfa", motif:"city",    outfit:["#0d9488","#134e4a"], ribbon:"#FFD54F" },
  adjective:{ sky:["#e879f9","#f0abfc","#f5d0fe"], glow:"#fdf4ff", hill:"#a21caf", particle:"#fdf4ff", motif:"sparkle", outfit:["#c026d3","#701a75"], ribbon:"#FFD54F" },
  daily:    { sky:["#60a5fa","#93c5fd","#bfdbfe"], glow:"#eff6ff", hill:"#1d4ed8", particle:"#eff6ff", motif:"lantern", outfit:["#2563eb","#1e3a8a"], ribbon:"#E53935" },
  nature:   { sky:["#4ade80","#86efac","#bbf7d0"], glow:"#f0fdf4", hill:"#15803d", particle:"#f0fdf4", motif:"cloud",   outfit:["#16a34a","#14532d"], ribbon:"#FF80AB" },
  body:     { sky:["#fb923c","#fdba74","#fed7aa"], glow:"#fff7ed", hill:"#c2410c", particle:"#fff7ed", motif:"sun",     outfit:["#ea580c","#7c2d12"], ribbon:"#FFD54F" },
  hobby:    { sky:["#818cf8","#a5b4fc","#c7d2fe"], glow:"#eef2ff", hill:"#4338ca", particle:"#eef2ff", motif:"sparkle", outfit:["#4f46e5","#312e81"], ribbon:"#FF80AB" },
  color:    { sky:["#f472b6","#f9a8d4","#fbcfe8"], glow:"#fdf2f8", hill:"#be185d", particle:"#fdf2f8", motif:"bubble",  outfit:["#db2777","#831843"], ribbon:"#FFD54F" },
  adverb:   { sky:["#fb7185","#c4b5fd","#a5b4fc"], glow:"#fef2f2", hill:"#4338ca", particle:"#fff",    motif:"lantern", outfit:["#e11d48","#1e1b4b"], ribbon:"#FFD54F" },
};

const PARTICLES = [
  {x:36,y:30,r:2.5,o:0.9},{x:96,y:20,r:1.8,o:0.7},
  {x:318,y:26,r:2.2,o:0.8},{x:366,y:44,r:2.6,o:0.85},
  {x:60,y:64,r:1.6,o:0.5},{x:350,y:80,r:1.8,o:0.6},
];

function Prop({ category, s }: { category: string; s: Scene }) {
  switch (category) {
    case "greeting":
      return (
        <g>
          <path d="M35 170 Q62 148 87 122 Q104 110 120 94" stroke="#A0744A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M87 122 Q94 105 108 93" stroke="#A0744A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="88" cy="120" r="12" fill="#FFB7C5" opacity="0.85"/>
          <circle cx="122" cy="92" r="10" fill="#FFB7C5" opacity="0.8"/>
          <circle cx="62" cy="146" r="9" fill="#FFC0CB" opacity="0.75"/>
          {[{cx:88,cy:120,r:12},{cx:122,cy:92,r:10}].map(({cx,cy,r},fi) =>
            [0,72,144,216,288].map(a => (
              <ellipse key={`${fi}-${a}`} cx={cx} cy={cy-r*0.6} rx={r*0.28} ry={r*0.5} fill="#FFDCE8" opacity="0.9" transform={`rotate(${a},${cx},${cy})`}/>
            ))
          )}
          <ellipse cx="50" cy="80" rx="6" ry="3.5" fill="#FFB7C5" transform="rotate(35,50,80)"/>
          <ellipse cx="78" cy="60" rx="5.5" ry="3" fill="#FFB7C5" transform="rotate(-22,78,60)"/>
          <ellipse cx="40" cy="112" rx="5" ry="3" fill="#FFC0CB" transform="rotate(55,40,112)"/>
          <ellipse cx="104" cy="70" rx="5" ry="3" fill="#FFB7C5" transform="rotate(15,104,70)"/>
        </g>
      );
    case "people":
      return (
        <g opacity="0.88">
          <circle cx="55" cy="112" r="16" fill={s.outfit[0]} opacity="0.5"/>
          <ellipse cx="55" cy="108" rx="13" ry="14" fill="#5b4636"/>
          <ellipse cx="55" cy="110" rx="11" ry="12" fill="#FFDBC4"/>
          <path d="M43 138C43 122 48 118 55 118C62 118 67 122 67 138L67 155 43 155Z" fill={s.outfit[0]} opacity="0.8"/>
          <ellipse cx="50" cy="109" rx="3" ry="4" fill="#1e40af"/>
          <ellipse cx="60" cy="109" rx="3" ry="4" fill="#1e40af"/>
          <circle cx="50" cy="106" r="1.5" fill="white"/>
          <circle cx="60" cy="106" r="1.5" fill="white"/>
          <path d="M51 118C53 121 57 121 59 118" stroke="#c0654f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="112" cy="116" r="13" fill={s.outfit[1]} opacity="0.45"/>
          <ellipse cx="112" cy="113" rx="11" ry="12" fill="#5b4636" opacity="0.8"/>
          <ellipse cx="112" cy="115" rx="9.5" ry="11" fill="#FFDBC4" opacity="0.9"/>
          <path d="M101 138C101 124 106 120 112 120C118 120 123 124 123 138L123 155 101 155Z" fill={s.outfit[1]} opacity="0.65"/>
          <ellipse cx="108" cy="115" rx="2.5" ry="3.5" fill="#1e40af" opacity="0.85"/>
          <ellipse cx="116" cy="115" rx="2.5" ry="3.5" fill="#1e40af" opacity="0.85"/>
          <circle cx="108" cy="112" r="1.5" fill="white" opacity="0.85"/>
          <circle cx="116" cy="112" r="1.5" fill="white" opacity="0.85"/>
        </g>
      );
    case "number":
      return (
        <g>
          <circle cx="52" cy="76" r="22" fill="white" opacity="0.92"/>
          <circle cx="52" cy="76" r="22" fill="none" stroke={s.outfit[0]} strokeWidth="2.5"/>
          <text x="52" y="76" fontSize="22" fontWeight="700" fill={s.outfit[0]} textAnchor="middle" fontFamily="sans-serif" dominantBaseline="central">1</text>
          <circle cx="98" cy="112" r="19" fill="white" opacity="0.88"/>
          <circle cx="98" cy="112" r="19" fill="none" stroke={s.outfit[0]} strokeWidth="2.5"/>
          <text x="98" y="112" fontSize="20" fontWeight="700" fill={s.outfit[0]} textAnchor="middle" fontFamily="sans-serif" dominantBaseline="central">2</text>
          <circle cx="64" cy="148" r="15" fill="white" opacity="0.82"/>
          <circle cx="64" cy="148" r="15" fill="none" stroke={s.outfit[0]} strokeWidth="2.5"/>
          <text x="64" y="148" fontSize="16" fontWeight="700" fill={s.outfit[0]} textAnchor="middle" fontFamily="sans-serif" dominantBaseline="central">3</text>
        </g>
      );
    case "time":
      return (
        <g>
          <circle cx="72" cy="104" r="42" fill="white" opacity="0.9"/>
          <circle cx="72" cy="104" r="42" fill="none" stroke="#334155" strokeWidth="2.5"/>
          <rect x="70" y="64" width="4" height="9" rx="2" fill="#334155"/>
          <rect x="70" y="135" width="4" height="9" rx="2" fill="#334155"/>
          <rect x="32" y="102" width="9" height="4" rx="2" fill="#334155"/>
          <rect x="103" y="102" width="9" height="4" rx="2" fill="#334155"/>
          <line x1="72" y1="104" x2="56" y2="80" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="72" y1="104" x2="90" y2="83" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="72" y1="104" x2="78" y2="140" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="72" cy="104" r="4" fill="#E53935"/>
          <circle cx="72" cy="104" r="2" fill="white"/>
        </g>
      );
    case "food":
      return (
        <g>
          <path d="M36 132 Q34 160 46 168 L98 168 Q110 160 108 132Z" fill="#E8C87A"/>
          <ellipse cx="72" cy="132" rx="36" ry="12" fill="#FFD580"/>
          <ellipse cx="56" cy="131" rx="10" ry="5" fill="#1a4a1a" transform="rotate(-10,56,131)"/>
          <circle cx="84" cy="130" r="11" fill="#FFFDE7"/>
          <circle cx="84" cy="130" r="7" fill="#FFCA28"/>
          <path d="M44 132 Q50 126 58 131 Q66 136 74 130" stroke="#FFE082" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M62 132 Q68 126 76 131 Q84 136 92 130" stroke="#FFE082" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M54 120 Q52 110 55 102 Q57 94 55 86" stroke="#CBD5E1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M72 118 Q70 108 73 100 Q75 92 73 84" stroke="#CBD5E1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M90 120 Q88 110 91 102 Q93 94 91 86" stroke="#CBD5E1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
          <rect x="98" y="86" width="3" height="50" rx="1.5" fill="#A0744A" transform="rotate(15,100,112)"/>
          <rect x="106" y="82" width="3" height="50" rx="1.5" fill="#A0744A" transform="rotate(20,108,108)"/>
        </g>
      );
    case "place":
      return (
        <g>
          <line x1="35" y1="166" x2="125" y2="166" stroke={s.hill} strokeWidth="2" opacity="0.4"/>
          <rect x="47" y="102" width="10" height="64" rx="5" fill="#E53935"/>
          <rect x="87" y="102" width="10" height="64" rx="5" fill="#E53935"/>
          <path d="M38 107 L106 107" stroke="#E53935" strokeWidth="10" strokeLinecap="round"/>
          <path d="M38 101 L106 101" stroke="#B71C1C" strokeWidth="5" strokeLinecap="round"/>
          <line x1="51" y1="118" x2="93" y2="118" stroke="#E53935" strokeWidth="7" strokeLinecap="round"/>
          <rect x="69" y="118" width="6" height="10" rx="1" fill="#B71C1C"/>
          <circle cx="62" cy="168" r="4" fill={s.hill} opacity="0.35"/>
          <circle cx="82" cy="168" r="4" fill={s.hill} opacity="0.35"/>
          <circle cx="102" cy="168" r="4" fill={s.hill} opacity="0.35"/>
        </g>
      );
    case "adjective":
      return (
        <g>
          {["#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#A855F7"].map((c,i) => (
            <path key={i} d={`M${32+i*6} 155 Q72 ${50+i*14} ${112-i*6} 155`}
              fill="none" stroke={c} strokeWidth="6" opacity="0.7" strokeLinecap="round"/>
          ))}
          <path d="M42 68 L44.5 74 L51 76.5 L44.5 79 L42 85 L39.5 79 L33 76.5 L39.5 74 Z" fill="#FFD54F"/>
          <path d="M96 58 L97.5 62 L102 63.5 L97.5 65 L96 69 L94.5 65 L89 63.5 L94.5 62 Z" fill="#FF80AB"/>
          <circle cx="62" cy="74" r="4" fill="#FFD54F" opacity="0.8"/>
          <circle cx="108" cy="82" r="3" fill="#FF80AB" opacity="0.8"/>
        </g>
      );
    case "daily":
      return (
        <g>
          <rect x="44" y="96" width="62" height="58" rx="8" fill={s.outfit[0]} opacity="0.88"/>
          <rect x="44" y="96" width="62" height="58" rx="8" fill="none" stroke={s.outfit[1]} strokeWidth="2"/>
          <path d="M44 118 Q44 96 75 96 Q106 96 106 118Z" fill={s.outfit[1]} opacity="0.7"/>
          <rect x="63" y="86" width="14" height="14" rx="5" fill={s.outfit[1]} opacity="0.85"/>
          <rect x="53" y="118" width="44" height="28" rx="5" fill="white" opacity="0.15"/>
          <rect x="53" y="118" width="44" height="28" rx="5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.45"/>
          <circle cx="75" cy="118" r="3" fill="white" opacity="0.7"/>
          <path d="M98 148 L100 154 L106 154 L101 158 L103 164 L98 160 L93 164 L95 158 L90 154 L96 154Z" fill="#FFD54F" opacity="0.9"/>
          <rect x="108" y="100" width="16" height="42" rx="4" fill="#FAFAFA" transform="rotate(8,116,122)"/>
          <line x1="112" y1="108" x2="120" y2="108" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(8,116,122)"/>
          <line x1="112" y1="114" x2="120" y2="114" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(8,116,122)"/>
          <line x1="112" y1="120" x2="120" y2="120" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(8,116,122)"/>
        </g>
      );
    case "nature":
      return (
        <g>
          <path d="M72 200 Q70 168 72 146 Q73 136 74 126" stroke="#A0744A" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <path d="M72 168 Q58 160 48 148" stroke="#A0744A" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M73 156 Q84 146 92 138" stroke="#A0744A" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="72" cy="108" r="42" fill="#4ade80" opacity="0.8"/>
          <circle cx="50" cy="120" r="28" fill="#22c55e" opacity="0.75"/>
          <circle cx="94" cy="116" r="30" fill="#16a34a" opacity="0.7"/>
          {[[60,94],[82,88],[70,76],[96,102],[48,104]].map(([fx,fy],i) => (
            <circle key={i} cx={fx} cy={fy} r="5.5" fill="#FFB7C5" opacity="0.9"/>
          ))}
          <path d="M116 86 Q128 76 126 90 Q122 98 116 94Z" fill="#FFD54F" opacity="0.8"/>
          <path d="M116 86 Q104 76 106 90 Q110 98 116 94Z" fill="#FFD54F" opacity="0.8"/>
          <path d="M116 94 Q128 96 126 106 Q122 112 116 106Z" fill="#FFD54F" opacity="0.7"/>
          <path d="M116 94 Q104 96 106 106 Q110 112 116 106Z" fill="#FFD54F" opacity="0.7"/>
          <line x1="116" y1="86" x2="116" y2="108" stroke="#78350f" strokeWidth="1.5"/>
        </g>
      );
    case "body":
      return (
        <g>
          <rect x="38" y="115" width="64" height="10" rx="5" fill="#94a3b8"/>
          <rect x="32" y="105" width="12" height="30" rx="4" fill="#64748b"/>
          <rect x="36" y="109" width="8" height="22" rx="3" fill="#475569"/>
          <rect x="96" y="105" width="12" height="30" rx="4" fill="#64748b"/>
          <rect x="100" y="109" width="8" height="22" rx="3" fill="#475569"/>
          <path d="M44 96 Q44 86 48 82 Q52 78 52 72" stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
          <path d="M64 92 Q64 82 68 78 Q72 74 72 68" stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75"/>
          <line x1="34" y1="94" x2="48" y2="90" stroke="white" strokeWidth="2" opacity="0.45" strokeLinecap="round"/>
          <line x1="34" y1="88" x2="52" y2="84" stroke="white" strokeWidth="2" opacity="0.45" strokeLinecap="round"/>
          <line x1="98" y1="94" x2="112" y2="90" stroke="white" strokeWidth="2" opacity="0.45" strokeLinecap="round"/>
          <line x1="98" y1="88" x2="116" y2="84" stroke="white" strokeWidth="2" opacity="0.45" strokeLinecap="round"/>
        </g>
      );
    case "hobby":
      return (
        <g>
          <circle cx="52" cy="104" r="9" fill={s.outfit[0]} opacity="0.9"/>
          <line x1="61" y1="104" x2="61" y2="70" stroke={s.outfit[0]} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
          <circle cx="82" cy="88" r="8" fill={s.outfit[0]} opacity="0.82"/>
          <line x1="90" y1="88" x2="90" y2="58" stroke={s.outfit[0]} strokeWidth="3" strokeLinecap="round" opacity="0.82"/>
          <line x1="61" y1="70" x2="90" y2="58" stroke={s.outfit[0]} strokeWidth="4" strokeLinecap="round" opacity="0.82"/>
          <circle cx="110" cy="118" r="7" fill={s.outfit[1]} opacity="0.88"/>
          <line x1="117" y1="118" x2="117" y2="92" stroke={s.outfit[1]} strokeWidth="2.5" strokeLinecap="round" opacity="0.88"/>
          <path d="M117 92 Q128 88 126 98" fill="none" stroke={s.outfit[1]} strokeWidth="2.5" strokeLinecap="round" opacity="0.88"/>
          <circle cx="42" cy="72" r="4" fill="#FFD54F" opacity="0.9"/>
          <circle cx="108" cy="72" r="3" fill="#FFD54F" opacity="0.8"/>
          <circle cx="124" cy="84" r="2.5" fill="#FFD54F" opacity="0.7"/>
        </g>
      );
    case "color":
      return (
        <g>
          <path d="M40 110 Q38 80 58 68 Q78 58 98 66 Q118 74 114 96 Q110 118 90 120 Q76 122 70 114 Q64 108 40 110Z" fill="#FFF8E1" opacity="0.95"/>
          <path d="M40 110 Q38 80 58 68 Q78 58 98 66 Q118 74 114 96 Q110 118 90 120 Q76 122 70 114 Q64 108 40 110Z" fill="none" stroke="#D4B896" strokeWidth="2"/>
          <ellipse cx="62" cy="108" rx="10" ry="13" fill="#E8D5B0"/>
          {[{cx:62,cy:74,c:"#EF4444"},{cx:80,cy:64,c:"#F97316"},{cx:100,cy:68,c:"#EAB308"},
            {cx:112,cy:84,c:"#22C55E"},{cx:106,cy:104,c:"#3B82F6"},{cx:90,cy:112,c:"#A855F7"}].map(({cx,cy,c},i) => (
            <circle key={i} cx={cx} cy={cy} r="8" fill={c} opacity="0.9"/>
          ))}
          <line x1="120" y1="60" x2="90" y2="112" stroke="#A0744A" strokeWidth="3" strokeLinecap="round"/>
          <path d="M118 62 Q122 58 124 62 Q120 72 116 70Z" fill={s.outfit[0]}/>
        </g>
      );
    case "adverb":
      return (
        <g>
          <line x1="35" y1="88" x2="75" y2="88" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.55"/>
          <line x1="35" y1="100" x2="90" y2="100" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.65"/>
          <line x1="35" y1="112" x2="80" y2="112" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.55"/>
          <path d="M72 80 L112 100 L72 120 L78 100 Z" fill="white" opacity="0.88"/>
          <path d="M78 88 L102 100 L78 112 L82 100 Z" fill={s.outfit[0]} opacity="0.65"/>
          <path d="M46 68 L48.5 74 L55 76.5 L48.5 79 L46 85 L43.5 79 L37 76.5 L43.5 74 Z" fill="#FFD54F" opacity="0.82"/>
          <path d="M110 128 L111.5 132 L116 133.5 L111.5 135 L110 139 L108.5 135 L103 133.5 L108.5 132 Z" fill="#FF80AB" opacity="0.82"/>
          <path d="M38 130 Q58 108 92 118" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" strokeDasharray="6,3"/>
        </g>
      );
    default:
      return null;
  }
}

function Background({ s, id }: { s: Scene; id: string }) {
  return (
    <>
      <rect width="400" height="200" fill={`url(#${id}-sky)`} />
      <rect width="400" height="200" fill={`url(#${id}-glow)`} />
      {s.motif === "sun" && <circle cx="60" cy="50" r="30" fill={s.glow} opacity="0.95" />}
      {s.motif === "moon" && (
        <g><circle cx="64" cy="46" r="22" fill={s.glow} opacity="0.95" /><circle cx="74" cy="40" r="20" fill={s.sky[0]} /></g>
      )}
      {s.motif === "cloud" && (
        <g fill={s.glow} opacity="0.9"><ellipse cx="70" cy="46" rx="30" ry="14" /><ellipse cx="96" cy="42" rx="20" ry="11" /></g>
      )}
      {s.motif === "bubble" && (
        <g fill={s.glow}><circle cx="60" cy="44" r="16" opacity="0.8" /><circle cx="40" cy="70" r="9" opacity="0.6" /></g>
      )}
      {s.motif === "city" && (
        <g fill={s.hill} opacity="0.45">
          <rect x="22" y="58" width="16" height="48" rx="2" /><rect x="42" y="46" width="18" height="60" rx="2" /><rect x="64" y="54" width="14" height="52" rx="2" />
        </g>
      )}
      {s.motif === "sparkle" && (
        <g fill={s.glow}>
          {[{x:56,y:44,r:11},{x:92,y:64,r:6}].map((p,i) => (
            <path key={i} transform={`translate(${p.x} ${p.y})`}
              d={`M0 ${-p.r}C${p.r*.2} ${-p.r*.2} ${p.r*.2} ${-p.r*.2} ${p.r} 0C${p.r*.2} ${p.r*.2} ${p.r*.2} ${p.r*.2} 0 ${p.r}C${-p.r*.2} ${p.r*.2} ${-p.r*.2} ${p.r*.2} ${-p.r} 0C${-p.r*.2} ${-p.r*.2} ${-p.r*.2} ${-p.r*.2} 0 ${-p.r}Z`} />
          ))}
        </g>
      )}
      {s.motif === "lantern" && (
        <g>
          {[{x:50,y:34},{x:96,y:26},{x:330,y:30},{x:364,y:50}].map((p,i) => (
            <g key={i}>
              <line x1={p.x} y1={p.y-14} x2={p.x} y2={p.y-6} stroke={s.glow} strokeWidth="1" opacity="0.5" />
              <ellipse cx={p.x} cy={p.y} rx="7" ry="9" fill="#f59e0b" opacity="0.9" />
              <ellipse cx={p.x} cy={p.y} rx="3.5" ry="6" fill="#fff7ed" opacity="0.8" />
            </g>
          ))}
        </g>
      )}
      {PARTICLES.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={s.particle} opacity={p.o} />
      ))}
      <path d="M0 150C90 128 160 168 250 146 330 128 370 156 400 142L400 200 0 200Z" fill={s.hill} opacity="0.35" />
    </>
  );
}

function Mascot({ s, id }: { s: Scene; id: string }) {
  return (
    <g>
      <ellipse cx="200" cy="196" rx="60" ry="8" fill="#000" opacity="0.12" />

      {/* Neck */}
      <path d="M192 146L208 146 206 160 194 160Z" fill="#ffd9c6" />

      {/* White blouse body */}
      <path d="M168 190C168 164 183 152 200 152C217 152 232 164 232 190L232 200 168 200Z" fill="#FAFAFA" />

      {/* Sailor collar */}
      <path d="M200 158L168 190 183 178Z" fill={s.outfit[0]} opacity="0.9" />
      <path d="M200 158L232 190 217 178Z" fill={s.outfit[0]} opacity="0.9" />
      <rect x="194" y="158" width="12" height="28" fill="#F0F0F8" />

      {/* Ribbon bow */}
      <polygon points="196,168 186,175 190,181 196,176" fill="#E53935" />
      <polygon points="204,168 214,175 210,181 204,176" fill="#E53935" />
      <ellipse cx="200" cy="175" rx="5" ry="5" fill="#B71C1C" />

      {/* Skirt peek at bottom */}
      <path d="M168 190Q158 200 154 200L246 200Q242 200 232 190Z" fill={s.outfit[1]} opacity="0.9" />

      {/* Back hair */}
      <path d="M150 104C150 70 172 50 200 50C228 50 250 70 250 104C250 124 244 138 244 138L156 138C156 138 150 124 150 104Z" fill="#5b4636" />

      {/* Face */}
      <ellipse cx="200" cy="104" rx="44" ry="42" fill="#ffe3d3" />
      <ellipse cx="200" cy="104" rx="44" ry="42" fill={`url(#${id}-face)`} />

      {/* Front bangs */}
      <path d="M157 100C156 74 176 56 200 56C224 56 244 74 243 100C243 100 232 84 224 84C224 84 222 96 214 96 214 96 210 80 200 80 190 80 186 96 186 96 178 96 176 84 176 84 168 84 157 100 157 100Z" fill="#6b513c" />
      <path d="M157 100C156 74 176 56 200 56C224 56 244 74 243 100C243 100 232 84 224 84C224 84 222 96 214 96 214 96 210 80 200 80 190 80 186 96 186 96 178 96 176 84 176 84 168 84 157 100 157 100Z" fill={`url(#${id}-hair)`} opacity="0.5" />
      <path d="M156 100C152 100 150 116 154 128 156 120 160 110 162 106Z" fill="#6b513c" />
      <path d="M244 100C248 100 250 116 246 128 244 120 240 110 238 106Z" fill="#6b513c" />

      {/* Eyebrows */}
      <path d="M172 95C177 92 185 92 189 94" stroke="#8a6a52" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M211 94C215 92 223 92 228 95" stroke="#8a6a52" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Eyes */}
      {[180, 220].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="106" rx="10" ry="13" fill="#fff" />
          <ellipse cx={cx} cy="107" rx="9" ry="12" fill={`url(#${id}-iris)`} />
          <ellipse cx={cx} cy="110" rx="5.5" ry="7" fill="#2a2118" />
          <circle cx={cx - 3} cy="103" r="3.4" fill="#fff" />
          <circle cx={cx + 2.5} cy="112" r="1.7" fill="#fff" opacity="0.9" />
          <path d={`M${cx-10} 99C${cx-5} 95 ${cx+5} 95 ${cx+10} 99`} stroke="#3a2c20" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* Blush */}
      <ellipse cx="170" cy="120" rx="7" ry="4" fill="#fda4af" opacity="0.65" />
      <ellipse cx="230" cy="120" rx="7" ry="4" fill="#fda4af" opacity="0.65" />

      {/* Nose + mouth */}
      <circle cx="200" cy="116" r="1" fill="#c98e74" />
      <path d="M194 124C197 128 203 128 206 124" stroke="#c0654f" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Twin tails (over body so hair flows in front) */}
      <path d="M157,110 Q142,148 147,182" stroke="#5b4636" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M243,110 Q258,148 253,182" stroke="#5b4636" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M157,110 Q142,148 147,182" stroke="#6b513c" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M243,110 Q258,148 253,182" stroke="#6b513c" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.6"/>

      {/* Hair ties */}
      <ellipse cx="154" cy="118" rx="10" ry="7" fill={s.ribbon}/>
      <ellipse cx="154" cy="118" rx="6" ry="4.5" fill={s.ribbon} opacity="0.5"/>
      <ellipse cx="246" cy="118" rx="10" ry="7" fill={s.ribbon}/>
      <ellipse cx="246" cy="118" rx="6" ry="4.5" fill={s.ribbon} opacity="0.5"/>

      {/* Hair accessory */}
      <g transform="translate(232 78)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill="#fb7185" transform={`rotate(${a})`} />
        ))}
        <circle r="2.5" fill="#fde68a" />
      </g>
    </g>
  );
}

export default function CardArt({
  category,
  emoji,
  className = "",
}: {
  category: string;
  emoji: string;
  className?: string;
}) {
  const s = SCENES[category] ?? SCENES.adverb;
  const id = `art-${category}`;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={s.sky[0]} />
            <stop offset="55%" stopColor={s.sky[1]} />
            <stop offset="100%" stopColor={s.sky[2]} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="20%" cy="22%" r="70%">
            <stop offset="0%" stopColor={s.glow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={s.glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-iris`} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#a78b6a" />
            <stop offset="60%" stopColor="#6b4f35" />
            <stop offset="100%" stopColor="#3f2c1c" />
          </radialGradient>
          <radialGradient id={`${id}-face`} cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#ffe3d3" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffcdb8" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <Background s={s} id={id} />
        <Prop category={category} s={s} />
        <Mascot s={s} id={id} />
      </svg>

      <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-2xl text-xl backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 4px 16px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.9)" }}>
        <span style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,.15))" }}>{emoji}</span>
      </div>
    </div>
  );
}
