type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.94 4.3a1.2 1.2 0 0 0-1.62-1.17L2.82 9.86c-1.03.4-1 1.87.04 2.22l4.33 1.45 1.66 5.23c.27.86 1.36 1.12 1.99.48l2.4-2.44 4.44 3.27c.76.56 1.84.14 2.03-.78L21.94 4.3ZM9.5 13.2l8.2-6.1-6.7 7.2-.3 3-1.2-4.1Z" />
    </svg>
  );
}
