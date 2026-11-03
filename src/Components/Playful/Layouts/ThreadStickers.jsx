import { useId } from 'react';

// Mini stickers for the playful cursor thread: the hero's sticker set as
// glossy little vinyl toys — red line art and kawaii faces like the hero
// drawings, with gradient volume, highlights and a contact shadow so they
// read as 3D at ~40px. Each sits on a white die-cut sticker edge.

const LINE = '#9E1B12';
const PAPER = '#FFFDF8';
const EYE = '#2A1A14';
const BLUSH = '#F49A95';

const edge = { fill: PAPER, stroke: PAPER, strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' };
const line = { stroke: LINE, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

// Gradients shared by every sticker, prefixed per instance so ids never clash.
const Defs = ({ p }) => (
  <defs>
    <radialGradient id={`${p}red`} cx="35%" cy="28%" r="80%">
      <stop offset="0" stopColor="#FF9A8B" />
      <stop offset="0.45" stopColor="#E94A3C" />
      <stop offset="1" stopColor="#A41D13" />
    </radialGradient>
    <radialGradient id={`${p}cream`} cx="35%" cy="28%" r="85%">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.5" stopColor="#FFF0E2" />
      <stop offset="1" stopColor="#E8BFA8" />
    </radialGradient>
    <radialGradient id={`${p}gold`} cx="35%" cy="28%" r="85%">
      <stop offset="0" stopColor="#FFF4B8" />
      <stop offset="0.45" stopColor="#F8C537" />
      <stop offset="1" stopColor="#C2850A" />
    </radialGradient>
    <radialGradient id={`${p}coffee`} cx="40%" cy="35%" r="75%">
      <stop offset="0" stopColor="#9A5D3A" />
      <stop offset="1" stopColor="#4A2614" />
    </radialGradient>
    <linearGradient id={`${p}redBar`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FF7A6B" />
      <stop offset="1" stopColor="#C8281C" />
    </linearGradient>
    <linearGradient id={`${p}screen`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFF3EF" />
      <stop offset="1" stopColor="#F4B9AE" />
    </linearGradient>
    <linearGradient id={`${p}side`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#B4241A" />
      <stop offset="1" stopColor="#7C140D" />
    </linearGradient>
    <linearGradient id={`${p}gloss`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <radialGradient id={`${p}shadow`}>
      <stop offset="0" stopColor="#241A12" stopOpacity="0.32" />
      <stop offset="1" stopColor="#241A12" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const Sticker = ({ children }) => {
  const p = `ts${useId().replace(/:/g, '')}`;
  const url = (name) => `url(#${p}${name})`;
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full overflow-visible">
      <Defs p={p} />
      {children(url)}
    </svg>
  );
};

const Face = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="-3.5" cy="0" rx="1.7" ry="1.9" fill={EYE} />
    <ellipse cx="3.5" cy="0" rx="1.7" ry="1.9" fill={EYE} />
    <circle cx="-2.9" cy="-0.8" r="0.65" fill={PAPER} />
    <circle cx="4.1" cy="-0.8" r="0.65" fill={PAPER} />
    <circle cx="-3.9" cy="0.7" r="0.3" fill={PAPER} />
    <circle cx="3.1" cy="0.7" r="0.3" fill={PAPER} />
    <ellipse cx="-5.8" cy="2.6" rx="1.7" ry="1.05" fill={BLUSH} opacity="0.85" />
    <ellipse cx="5.8" cy="2.6" rx="1.7" ry="1.05" fill={BLUSH} opacity="0.85" />
    <path d="M-1.5 2q1.5 1.5 3 0" fill="none" stroke={EYE} strokeWidth="0.9" strokeLinecap="round" />
  </g>
);

const Shadow = ({ url, cx = 20, cy = 37.5, rx = 13 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry="2.4" fill={url('shadow')} />
);

export const BugSticker = () => (
  <Sticker>
    {(url) => (
      <>
        <Shadow url={url} cx={22} rx={14} />
        <g {...edge}>
          <ellipse cx="23" cy="23" rx="12.5" ry="10.5" />
          <circle cx="12" cy="19.5" r="7.5" />
          <path d="M8.5 13q-3.5-5 0.5-7.5M14.5 12.5q1.5-5 5.5-5" fill="none" />
        </g>
        {/* legs */}
        <path d="M16.5 31.5l-2 3M23 33.5v3M29.5 31.5l2 3" fill="none" stroke={LINE} strokeWidth="1.8" strokeLinecap="round" />
        {/* domed shell */}
        <ellipse cx="23" cy="23" rx="12.5" ry="10.5" fill={url('red')} {...line} />
        <path d="M23 12.5v21" fill="none" stroke={LINE} strokeWidth="1.3" />
        <circle cx="27.5" cy="18" r="2" fill="#6E120C" />
        <circle cx="31" cy="25" r="1.8" fill="#6E120C" />
        <circle cx="26" cy="29" r="1.6" fill="#6E120C" />
        <circle cx="18" cy="28.5" r="1.4" fill="#6E120C" />
        <ellipse cx="26.5" cy="16" rx="5" ry="2.4" fill={url('gloss')} transform="rotate(-12 26.5 16)" />
        <circle cx="32" cy="20" r="0.9" fill={PAPER} opacity="0.7" />
        {/* antennae with bobbles */}
        <path d="M8.5 13q-3.5-5 0.5-7.5M14.5 12.5q1.5-5 5.5-5" fill="none" stroke={LINE} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="5.5" r="1.7" fill={url('red')} stroke={LINE} strokeWidth="0.8" />
        <circle cx="20" cy="7.5" r="1.7" fill={url('red')} stroke={LINE} strokeWidth="0.8" />
        {/* head */}
        <circle cx="12" cy="19.5" r="7.5" fill={url('cream')} {...line} />
        <ellipse cx="9.5" cy="15.5" rx="2.6" ry="1.4" fill={url('gloss')} transform="rotate(-25 9.5 15.5)" />
        <Face x={12} y={20.5} s={0.82} />
      </>
    )}
  </Sticker>
);

// Rubber duck — the debugging buddy that chases the bug down the thread.
export const DuckSticker = () => (
  <Sticker>
    {(url) => (
      <>
        <Shadow url={url} cx={21} rx={14} />
        <g {...edge}>
          <path d="M9 24c0-5 4-8 9-8h6c4 0 6-3 9-5 1 4 0 7-1 9 2 2 3 4 3 6 0 6-6 9-13 9s-13-3-13-11z" />
          <circle cx="15" cy="14" r="7.5" />
          <path d="M8.5 13.5c-3 0-5.5 1-5.5 2.5s2.5 2.5 6 1.5z" />
        </g>
        {/* body with tail flick */}
        <path
          d="M9 24c0-5 4-8 9-8h6c4 0 6-3 9-5 1 4 0 7-1 9 2 2 3 4 3 6 0 6-6 9-13 9s-13-3-13-11z"
          fill={url('gold')}
          {...line}
        />
        <path d="M19 25c3 3 8 3 11-1" fill="none" stroke="#B57A08" strokeWidth="1.3" strokeLinecap="round" />
        <ellipse cx="16" cy="22" rx="4" ry="1.8" fill={url('gloss')} transform="rotate(-15 16 22)" />
        {/* head + beak */}
        <circle cx="15" cy="14" r="7.5" fill={url('gold')} {...line} />
        <path d="M8.5 13.5c-3 0-5.5 1-5.5 2.5s2.5 2.5 6 1.5z" fill={url('redBar')} {...line} strokeWidth="1.2" />
        <ellipse cx="13" cy="9.8" rx="2.6" ry="1.3" fill={url('gloss')} transform="rotate(-20 13 9.8)" />
        <Face x={16} y={14} s={0.72} />
      </>
    )}
  </Sticker>
);

// Coffee — the fuel at the head of the thread, steam and all.
export const CoffeeSticker = () => (
  <Sticker>
    {(url) => (
      <>
        <Shadow url={url} cx={19} rx={14} />
        <g {...edge}>
          <path d="M15 11c-2-2 0-3.5 0-5.5M21 11c-2-2 0-3.5 0-5.5" fill="none" />
          <path d="M27.5 18c5.5 0 6.5 9 0 9.5" fill="none" strokeWidth="9" />
          <path d="M8 15h22l-2.2 16a4 4 0 0 1-4 3.5h-9.6a4 4 0 0 1-4-3.5z" />
          <ellipse cx="19" cy="34.5" rx="12.5" ry="2.8" />
        </g>
        {/* steam */}
        <path d="M15 11c-2-2 0-3.5 0-5.5M21 11c-2-2 0-3.5 0-5.5" fill="none" stroke="#E9A79E" strokeWidth="1.6" strokeLinecap="round" />
        {/* saucer */}
        <ellipse cx="19" cy="34.5" rx="12.5" ry="2.8" fill={url('red')} {...line} />
        {/* handle */}
        <path d="M27.5 18c5.5 0 6.5 9 0 9.5" fill="none" stroke={LINE} strokeWidth="4.6" strokeLinecap="round" />
        <path d="M27.5 18c5.5 0 6.5 9 0 9.5" fill="none" stroke="#FFF0E2" strokeWidth="2.2" strokeLinecap="round" />
        {/* cup */}
        <path d="M8 15h22l-2.2 16a4 4 0 0 1-4 3.5h-9.6a4 4 0 0 1-4-3.5z" fill={url('cream')} {...line} />
        <ellipse cx="19" cy="15" rx="11" ry="2.6" fill={url('coffee')} {...line} />
        <ellipse cx="16" cy="14.5" rx="3" ry="0.8" fill={PAPER} opacity="0.35" />
        <ellipse cx="12.5" cy="21" rx="1.6" ry="4" fill={url('gloss')} transform="rotate(-8 12.5 21)" />
        <Face x={19.5} y={23.5} s={0.85} />
      </>
    )}
  </Sticker>
);

// Keycap — a little `{ }` key, matching the site's 3D keyboard tech stack.
export const KeycapSticker = () => (
  <Sticker>
    {(url) => (
      <>
        <Shadow url={url} rx={15} />
        <rect x="4.5" y="6" width="31" height="30" rx="6" {...edge} />
        {/* skirt = the key's sides */}
        <rect x="4.5" y="6" width="31" height="30" rx="6" fill={url('side')} {...line} />
        <path d="M5 12l3.5 1.5M35 12l-3.5 1.5M5.5 33l3.5-3M34.5 33l-3.5-3" stroke="#6A100A" strokeWidth="0.9" opacity="0.6" />
        {/* dished top face */}
        <rect x="8" y="7.5" width="24" height="22" rx="4.5" fill={url('cream')} {...line} />
        <path d="M10.5 9.3h15" stroke={PAPER} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        <path d="M13 12.5q-2 0-2 2v1.6q0 1.6-1.6 1.6q1.6 0 1.6 1.6v1.6q0 2 2 2" fill="none" stroke={LINE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 12.5q2 0 2 2v1.6q0 1.6 1.6 1.6q-1.6 0-1.6 1.6v1.6q0 2-2 2" fill="none" stroke={LINE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <Face x={20} y={17.5} s={0.78} />
      </>
    )}
  </Sticker>
);