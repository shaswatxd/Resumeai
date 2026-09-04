import React from 'react'

export function GaneshIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Crown / Mukut */}
      <path d="M42 16L50 8L58 16L55 24H45L42 16Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="50" cy="14" r="2.5" fill="#DC2626" />
      <path d="M46 24L50 20L54 24" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />

      {/* Tilak */}
      <path d="M47 28H53M48 32H52M49 36H51" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="39" r="1.2" fill="#DC2626" />

      {/* Head & Ears */}
      <path
        d="M38 28C32 28 26 32 26 40C26 48 33 51 38 50"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M62 28C68 28 74 32 74 40C74 48 67 51 62 50"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Forehead Arch */}
      <path
        d="M38 34C44 30 56 30 62 34"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Trunk (Sond) */}
      <path
        d="M48 36C48 44 45 54 48 62C50 67 56 68 60 65C63 62 62 57 58 57C54 57 53 60 55 62"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Modak in Hand / Trunk Tip */}
      <circle cx="65" cy="58" r="3.5" fill={color} />
      <circle cx="65" cy="56" r="1.5" fill="#DC2626" />

      {/* Tusk (Dant) */}
      <path d="M43 48L39 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M57 48L61 51" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Halo / Aura circles */}
      <circle cx="50" cy="40" r="35" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="40" r="38" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function OmIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
      {/* ॐ Om calligraphy path */}
      <path
        d="M32 36C32 28 40 24 48 27C54 30 55 37 51 43C47 48 41 48 39 48M48 43C56 46 62 54 59 64C56 73 45 76 36 71C30 67 27 60 28 55M55 46C65 42 75 48 76 60C77 69 71 76 65 80"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crescent & Chandrabindu */}
      <path
        d="M58 24C65 24 72 27 75 33"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="70" cy="18" r="3" fill={color} />
    </svg>
  )
}

export function KalashIcon({ className = 'size-12', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Coconut Top */}
      <ellipse cx="50" cy="24" rx="11" ry="14" fill={color} opacity="0.85" />
      <path d="M50 10L50 6M44 14L40 9M56 14L60 9" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Mango Leaves */}
      <path d="M50 32C42 22 28 26 25 33C33 34 43 33 50 36" fill={color} opacity="0.9" />
      <path d="M50 32C58 22 72 26 75 33C67 34 57 33 50 36" fill={color} opacity="0.9" />
      <path d="M50 33C46 20 38 16 35 18C37 24 42 30 50 34" fill={color} />
      <path d="M50 33C54 20 62 16 65 18C63 24 58 30 50 34" fill={color} />

      {/* Pot Neck & Body */}
      <rect x="38" y="36" width="24" height="6" rx="2" fill={color} />
      <path
        d="M38 42C30 46 26 56 26 66C26 78 37 84 50 84C63 84 74 78 74 66C74 56 70 46 62 42H38Z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* Swastik on Kalash */}
      <path
        d="M50 56V72M42 64H58M42 56H50M50 72H58M58 56V64M42 64V72"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Base */}
      <path d="M40 84H60L63 90H37L40 84Z" fill={color} />
    </svg>
  )
}

export function SwastikIcon({ className = 'size-12', color = '#DC2626' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <path
        d="M50 20V80M20 50H80M20 20H50M50 80H80M80 20V50M20 50V80"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      {/* Ik Onkar Symbol */}
      <path
        d="M32 30C32 22 40 18 48 20C55 23 58 30 54 38C50 45 42 50 35 56L62 56"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 56C48 70 54 80 66 80C78 80 82 66 78 48C74 34 60 26 44 26"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="48" cy="20" r="2.5" fill={color} />
    </svg>
  )
}

export function CornerMandala({ className = 'size-20', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer corner frame */}
      <path d="M6 114V20C6 12 12 6 20 6H114" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 114V26C14 19 19 14 26 14H114" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 90V34C22 27 27 22 34 22H90" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Quarter mandala radial petals */}
      <circle cx="6" cy="6" r="48" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="6" cy="6" r="32" stroke={color} strokeWidth="1.2" />
      <circle cx="6" cy="6" r="16" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />

      {/* Petal sweeps */}
      <path d="M6 32C18 32 32 18 32 6" stroke={color} strokeWidth="1.8" />
      <path d="M6 48C28 48 48 28 48 6" stroke={color} strokeWidth="1.5" />
      <path d="M6 64C38 64 64 38 64 6" stroke={color} strokeWidth="1" strokeDasharray="4 2" />

      {/* Ornamental Dots */}
      <circle cx="36" cy="36" r="3" fill={color} />
      <circle cx="22" cy="50" r="2" fill={color} />
      <circle cx="50" cy="22" r="2" fill={color} />
      <circle cx="70" cy="14" r="2.5" fill={color} />
      <circle cx="14" cy="70" r="2.5" fill={color} />
    </svg>
  )
}

export function HeaderFlourish({ className = 'w-48 h-5', color = '#D4AF37' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 12H85M155 12H240" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="95" cy="12" r="2" fill={color} />
      <circle cx="145" cy="12" r="2" fill={color} />
      {/* Central Diamond & Leaf */}
      <path d="M120 4L128 12L120 20L112 12Z" fill={color} />
      <path d="M104 12C108 8 114 8 117 12C114 16 108 16 104 12Z" fill={color} opacity="0.75" />
      <path d="M136 12C132 8 126 8 123 12C126 16 132 16 136 12Z" fill={color} opacity="0.75" />
    </svg>
  )
}

export function LotusMotif({ className = 'size-8', color = '#DC2626' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Center Petal */}
      <path d="M30 10C26 22 26 36 30 46C34 36 34 22 30 10Z" fill={color} opacity="0.9" />
      {/* Inner Petals */}
      <path d="M30 20C22 26 18 36 22 45C26 40 29 35 30 26" fill={color} opacity="0.7" />
      <path d="M30 20C38 26 42 36 38 45C34 40 31 35 30 26" fill={color} opacity="0.7" />
      {/* Outer Petals */}
      <path d="M26 30C16 33 12 40 14 47C20 46 24 42 27 36" fill={color} opacity="0.5" />
      <path d="M34 30C44 33 48 40 46 47C40 46 36 42 33 36" fill={color} opacity="0.5" />
      {/* Lotus Base */}
      <path d="M20 48C26 51 34 51 40 48C36 47 24 47 20 48Z" fill={color} />
    </svg>
  )
}
