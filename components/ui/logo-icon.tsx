import * as React from "react";

export function LogoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" y1="1" x2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="currentColor" className=" text-zinc-100" />
          <stop offset="1" stopColor="currentColor" className="text-zinc-300" />
          {/* <stop offset="0" stopColor="currentColor" className="text-zinc-800 dark:text-zinc-200" />
          <stop offset="1" stopColor="currentColor" className="text-zinc-600 dark:text-zinc-400" /> */}
        </linearGradient>
        <linearGradient id="logo-gradient-2" y1="1" x2="0" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="currentColor" className="text-amber-600" />
          <stop offset="1" stopColor="currentColor" className="text-amber-400" />
        </linearGradient>
        <linearGradient id="logo-gradient-5" y1="1" x2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="currentColor" className="text-amber-700" />
          <stop offset="0.611" stopColor="currentColor" className="text-amber-600" />
          <stop offset="1" stopColor="currentColor" className="text-amber-600" />
        </linearGradient>
        <linearGradient
          id="logo-gradient-6"
          x1="-0.887"
          y1="1.19"
          x2="1.36"
          y2="0.097"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="currentColor" className="text-amber-600" />
          <stop offset="0" stopColor="currentColor" className="text-amber-600" />
          <stop offset="1" stopColor="currentColor" className="text-amber-300" />
        </linearGradient>
      </defs>
      <g transform="translate(-2 -2)">
        <circle cx="48" cy="48" r="48" transform="translate(2 2)" fill="url(#logo-gradient)" />
        <path
          d="M25,35H75M25,50H75M25,65H75"
          stroke="currentColor"
          className="text-slate-300"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <rect
          width="8"
          height="10"
          transform="translate(35 65)"
          opacity="0.9"
          fill="url(#logo-gradient-2)"
        />
        <rect
          width="8"
          height="15"
          transform="translate(45 60)"
          opacity="0.9"
          fill="url(#logo-gradient-2)"
        />
        <rect
          width="8"
          height="20"
          transform="translate(55 55)"
          opacity="0.9"
          fill="url(#logo-gradient-2)"
        />
        <path
          d="M50,47.808a58.54,58.54,0,0,1,4.038-9.428c3.305-6.144,7.716-10.7,13.068-13.38l2.653,3.457c-8.268,2.756-13.637,10.518-14.683,12.609"
          transform="translate(-11.674 11.278)"
          fill="url(#logo-gradient-5)"
        />
        <circle
          cx="45"
          cy="45"
          r="45"
          transform="translate(5 5)"
          fill="none"
          stroke="currentColor"
          className="text-zinc-100 dark:text-zinc-400"
          strokeWidth="0.5"
          opacity="0.1"
        />
        <path
          d="M65,15l11.629,5.814L70.814,32.443"
          transform="matrix(0.966, -0.259, 0.259, 0.966, -15.541, 33.168)"
          fill="url(#logo-gradient-6)"
        />
      </g>
    </svg>
  );
} 