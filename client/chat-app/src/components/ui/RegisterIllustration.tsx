export function RegisterIllustration() {
  return (
    <svg
      viewBox="0 0 360 360"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="180" cy="190" r="150" fill="#FFE3ED" />
      <circle cx="298" cy="80" r="16" fill="#FF5C8D" />
      <circle cx="48" cy="260" r="10" fill="#7CC6FF" />
      <circle cx="64" cy="90" r="7" fill="#7CC6FF" />

      {/* floating mini chat bubble */}
      <g>
        <rect x="232" y="120" width="62" height="42" rx="14" fill="#fff" />
        <path d="M250 162 L242 176 L262 162 Z" fill="#fff" />
        <circle cx="250" cy="141" r="4" fill="#FF5C8D" />
        <circle cx="263" cy="141" r="4" fill="#FF5C8D" />
        <circle cx="276" cy="141" r="4" fill="#FF5C8D" />
      </g>

      {/* floating mini chat bubble */}
      <g>
        <rect x="62" y="200" width="54" height="38" rx="12" fill="#fff" />
        <path d="M98 238 L106 250 L112 238 Z" fill="#fff" />
        <circle cx="78" cy="219" r="3.5" fill="#7CC6FF" />
        <circle cx="89" cy="219" r="3.5" fill="#7CC6FF" />
        <circle cx="100" cy="219" r="3.5" fill="#7CC6FF" />
      </g>

      {/* main denjo character: a big rounded speech bubble face */}
      <g>
        <path
          d="M180 90c-50 0-90 34-90 84 0 36 22 64 56 76l-6 34 36-26c2 .1 4 .1 4 .1 50 0 90-38 90-84s-40-84-90-84z"
          fill="#08060d"
        />
        <path
          d="M180 96c-46 0-83 32-83 78 0 33 20 59 52 70l-5 31 33-24c1 0 2 0 3 0 46 0 83-35 83-77s-37-78-83-78z"
          fill="#FFFFFF"
        />
        {/* antenna */}
        <line x1="180" y1="96" x2="180" y2="66" stroke="#08060d" strokeWidth="5" strokeLinecap="round" />
        <circle cx="180" cy="58" r="9" fill="#FF5C8D" />

        {/* face */}
        <circle cx="156" cy="168" r="8" fill="#08060d" />
        <circle cx="204" cy="168" r="8" fill="#08060d" />
        <path d="M156 196c8 12 40 12 48 0" stroke="#08060d" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* cheeks */}
        <circle cx="138" cy="184" r="9" fill="#FFC4D6" opacity="0.8" />
        <circle cx="222" cy="184" r="9" fill="#FFC4D6" opacity="0.8" />
      </g>

      {/* sparkle */}
      <path d="M276 220l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#7CC6FF" />
    </svg>
  )
}
