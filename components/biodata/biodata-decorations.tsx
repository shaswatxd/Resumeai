import React from 'react'

export function GaneshIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M42 16L50 8L58 16L55 24H45L42 16Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="50" cy="14" r="2.5" fill="#DC2626" />
      <path d="M46 24L50 20L54 24" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />
      <path d="M47 28H53M48 32H52M49 36H51" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="39" r="1.2" fill="#DC2626" />
      <path d="M38 28C32 28 26 32 26 40C26 48 33 51 38 50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M62 28C68 28 74 32 74 40C74 48 67 51 62 50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 34C44 30 56 30 62 34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M48 36C48 44 45 54 48 62C50 67 56 68 60 65C63 62 62 57 58 57C54 57 53 60 55 62" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="65" cy="58" r="3.5" fill={color} />
      <circle cx="65" cy="56" r="1.5" fill="#DC2626" />
      <path d="M43 48L39 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M57 48L61 51" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="40" r="35" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="40" r="38" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function OmIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
      <path d="M32 36C32 28 40 24 48 27C54 30 55 37 51 43C47 48 41 48 39 48M48 43C56 46 62 54 59 64C56 73 45 76 36 71C30 67 27 60 28 55M55 46C65 42 75 48 76 60C77 69 71 76 65 80" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 24C65 24 72 27 75 33" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="70" cy="18" r="3" fill={color} />
    </svg>
  )
}

export function KalashIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="50" cy="24" rx="11" ry="14" fill={color} opacity="0.85" />
      <path d="M50 10L50 6M44 14L40 9M56 14L60 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M50 32C42 22 28 26 25 33C33 34 43 33 50 36" fill={color} opacity="0.9" />
      <path d="M50 32C58 22 72 26 75 33C67 34 57 33 50 36" fill={color} opacity="0.9" />
      <rect x="38" y="36" width="24" height="6" rx="2" fill={color} />
      <path d="M38 42C30 46 26 56 26 66C26 78 37 84 50 84C63 84 74 78 74 66C74 56 70 46 62 42H38Z" fill={color} opacity="0.2" stroke={color} strokeWidth="2.5" />
      <path d="M50 56V72M42 64H58M42 56H50M50 72H58M58 56V64M42 64V72" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 84H60L63 90H37L40 84Z" fill={color} />
    </svg>
  )
}

export function SwastikIcon({ className = 'size-12', color = '#DC2626' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <path d="M50 20V80M20 50H80M20 20H50M50 80H80M80 20V50M20 50V80" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="35" cy="35" r="3.5" fill={color} />
      <circle cx="65" cy="35" r="3.5" fill={color} />
      <circle cx="35" cy="65" r="3.5" fill={color} />
      <circle cx="65" cy="65" r="3.5" fill={color} />
    </svg>
  )
}

export function EkOnkarIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
      <path d="M32 30C32 22 40 18 48 20C55 23 58 30 54 38C50 45 42 50 35 56L62 56" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 56C48 70 54 80 66 80C78 80 82 66 78 48C74 34 60 26 44 26" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="48" cy="20" r="2.5" fill={color} />
    </svg>
  )
}

/* ----------------- MUSLIM / ISLAMIC CRESTS ----------------- */

export function BismillahCalligraphy({ className = 'w-56 h-14', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <span
        className="text-xl sm:text-2xl font-bold tracking-widest leading-relaxed drop-shadow-sm"
        style={{ color, fontFamily: 'serif' }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </span>
      <div className="w-36 h-0.5 mt-1 rounded-full opacity-60" style={{ backgroundColor: color }} />
    </div>
  )
}

export function CrescentStarIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      {/* Crescent */}
      <path
        d="M60 24C44 24 32 36 32 52C32 68 44 80 60 80C66 80 72 78 76 74C64 74 54 64 54 52C54 40 64 30 76 30C72 26 66 24 60 24Z"
        fill={color}
      />
      {/* 5-pointed Star */}
      <path
        d="M74 42L76 47L81 47L77 50L79 55L74 52L70 55L72 50L68 47L73 47L74 42Z"
        fill={color}
      />
    </svg>
  )
}

/* ----------------- SIKH / ANAND KARAJ CRESTS ----------------- */

export function KhandaIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />
      {/* Central Double-edged Sword (Khanda) */}
      <path d="M50 14V86M47 30L50 14L53 30M47 70H53" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Center Chakkar (Ring) */}
      <circle cx="50" cy="50" r="16" stroke={color} strokeWidth="3.5" fill="none" />
      {/* Left Kirpan */}
      <path
        d="M34 32C24 44 24 62 38 74C40 76 44 76 43 72C35 62 35 46 43 38C44 36 41 33 39 33L34 32Z"
        fill={color}
      />
      {/* Right Kirpan */}
      <path
        d="M66 32C76 44 76 62 62 74C60 76 56 76 57 72C65 62 65 46 57 38C56 36 59 33 61 33L66 32Z"
        fill={color}
      />
    </svg>
  )
}

/* ----------------- CHRISTIAN / HOLY MATRIMONY CRESTS ----------------- */

export function ChristianCrossIcon({ className = 'size-12', color = '#831843' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      {/* Ornate Latin Cross */}
      <path
        d="M48 16H52V84H48V16ZM30 36H70V40H30V36Z"
        fill={color}
      />
      {/* Flared Ends */}
      <path d="M46 16L50 12L54 16M46 84L50 88L54 84M30 34L26 38L30 42M70 34L74 38L70 42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="38" r="4" fill="#D4AF37" />
    </svg>
  )
}

export function PeaceDoveIcon({ className = 'size-12', color = '#831843' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />
      {/* Dove */}
      <path
        d="M32 56C36 46 48 42 58 46C66 40 76 38 80 44C78 52 72 58 64 60C58 66 50 70 40 68C32 66 28 60 32 56Z"
        fill={color}
        opacity="0.85"
      />
      {/* Wings */}
      <path
        d="M46 48C46 36 54 26 66 22C64 32 58 40 50 46"
        fill={color}
      />
      {/* Olive leaf */}
      <path d="M28 58C24 56 22 52 26 50C28 54 28 56 28 58Z" fill="#15803D" />
    </svg>
  )
}

/* ----------------- JAIN / NAVKAR CRESTS ----------------- */

export function NavkarMantraCrest({ className = 'w-48 h-12', color = '#92400E' }: { className?: string; color?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <span
        className="text-sm sm:text-base font-bold tracking-widest text-center leading-tight drop-shadow-xs"
        style={{ color, fontFamily: 'var(--font-devanagari-serif), serif' }}
      >
        || ॐ णमो अरिहंताणं ||
      </span>
      <span className="text-[10px] tracking-wider text-amber-700 font-semibold mt-0.5">
        परस्परोग्रहो जीवानाम्
      </span>
      <div className="w-28 h-0.5 mt-1 rounded-full opacity-60" style={{ backgroundColor: color }} />
    </div>
  )
}

export function JainAhimsaIcon({ className = 'size-12', color = '#92400E' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      {/* Upright Open Palm (Abhaya / Ahimsa Hand) */}
      <path
        d="M40 32V52C40 54 42 56 44 56C46 56 48 54 48 52V26C48 24 50 22 52 22C54 22 56 24 56 26V52C56 54 58 56 60 56C62 56 64 54 64 52V30C64 28 66 26 68 26C70 26 72 28 72 30V56C72 68 62 76 50 76C38 76 32 68 32 58V40C32 38 34 36 36 36C38 36 40 38 40 40V32Z"
        fill={color}
        opacity="0.85"
      />
      {/* Dharma Wheel in palm */}
      <circle cx="52" cy="58" r="8" stroke="#DC2626" strokeWidth="2" fill="none" />
      <circle cx="52" cy="58" r="2.5" fill="#DC2626" />
    </svg>
  )
}

/* ----------------- BORDERS & FLOURISHES ----------------- */

export function CornerMandala({ className = 'size-20', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 114V20C6 12 12 6 20 6H114" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 114V26C14 19 19 14 26 14H114" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 90V34C22 27 27 22 34 22H90" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="6" cy="6" r="48" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="6" cy="6" r="32" stroke={color} strokeWidth="1.2" />
      <circle cx="6" cy="6" r="16" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <path d="M6 32C18 32 32 18 32 6" stroke={color} strokeWidth="1.8" />
      <path d="M6 48C28 48 48 28 48 6" stroke={color} strokeWidth="1.5" />
      <circle cx="36" cy="36" r="3" fill={color} />
      <circle cx="22" cy="50" r="2" fill={color} />
      <circle cx="50" cy="22" r="2" fill={color} />
    </svg>
  )
}

export function HeaderFlourish({ className = 'w-48 h-5', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 12H85M155 12H240" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="95" cy="12" r="2" fill={color} />
      <circle cx="145" cy="12" r="2" fill={color} />
      <path d="M120 4L128 12L120 20L112 12Z" fill={color} />
      <path d="M104 12C108 8 114 8 117 12C114 16 108 16 104 12Z" fill={color} opacity="0.75" />
      <path d="M136 12C132 8 126 8 123 12C126 16 132 16 136 12Z" fill={color} opacity="0.75" />
    </svg>
  )
}

export function LotusMotif({ className = 'size-8', color = '#DC2626' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 10C26 22 26 36 30 46C34 36 34 22 30 10Z" fill={color} opacity="0.9" />
      <path d="M30 20C22 26 18 36 22 45C26 40 29 35 30 26" fill={color} opacity="0.7" />
      <path d="M30 20C38 26 42 36 38 45C34 40 31 35 30 26" fill={color} opacity="0.7" />
      <path d="M20 48C26 51 34 51 40 48C36 47 24 47 20 48Z" fill={color} />
    </svg>
  )
}
