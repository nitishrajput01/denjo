type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={['logo', className].filter(Boolean).join(' ')}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="30" height="30" rx="9" fill="#FF5C8D" />
        <path
          d="M8 12.2C8 9.88 9.88 8 12.2 8H17.8C20.12 8 22 9.88 22 12.2V15.4C22 17.72 20.12 19.6 17.8 19.6H13.6L10.1 22.1C9.72 22.37 9.2 22.1 9.2 21.63V19.5C8.5 19.1 8 18 8 16.8V12.2Z"
          fill="white"
        />
        <circle cx="12.2" cy="13.8" r="1.15" fill="#FF5C8D" />
        <circle cx="15" cy="13.8" r="1.15" fill="#FF5C8D" />
        <circle cx="17.8" cy="13.8" r="1.15" fill="#FF5C8D" />
      </svg>
      <span className="logo__text">denjo</span>
    </div>
  )
}
