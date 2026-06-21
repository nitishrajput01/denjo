import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  )
}

export function NoteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export function MoreIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={2.4}>
      <path d="M5 12h.01M12 12h.01M19 12h.01" />
    </svg>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M11 2.5 12.6 8 18 9.6 12.6 11.2 11 16.7 9.4 11.2 4 9.6 9.4 8 11 2.5Z" />
      <path d="M18 14.5 18.9 17 21.4 17.9 18.9 18.8 18 21.3 17.1 18.8 14.6 17.9 17.1 17 18 14.5Z" />
    </svg>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M3.5 11.6 19.8 4.3a.6.6 0 0 1 .8.8l-5.6 15.4a.6.6 0 0 1-1.1.05l-2.7-5.6-5.6-2.7a.6.6 0 0 1 .05-1.15Z" />
      <path d="M11.2 12.8 14.9 9.1" stroke="#fff" strokeWidth={1.4} />
    </svg>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </svg>
  )
}

export function PaperclipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 7.5 9.5 15a3 3 0 1 0 4.2 4.2l6-6a5 5 0 0 0-7.1-7.1l-6.4 6.4" />
    </svg>
  )
}

export function EmojiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 10h.01M15 10h.01" strokeWidth={2.4} />
      <path d="M8.5 14a4 4 0 0 0 7 0" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.3l3 1.7" />
    </svg>
  )
}
