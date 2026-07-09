/**
 * Tiny dependency-free icon set (stroke-based, inherits currentColor).
 */
export type IconName =
  | 'home'
  | 'calendar'
  | 'info'
  | 'bell'
  | 'pin'
  | 'chevron'
  | 'back'
  | 'clock'
  | 'location'
  | 'external'
  | 'phone'
  | 'check'
  | 'heart';

const paths: Record<IconName, JSX.Element> = {
  home: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5h.01" />
    </>
  ),
  bell: (
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" />
  ),
  pin: (
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z M12 10.5h.01" />
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  back: <path d="m14 6-6 6 6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  phone: (
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  check: <path d="m5 12 5 5 9-11" />,
  heart: (
    <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.3 7.7 3.6 4.5 7 4.5c2 0 3.7 1.1 5 2.9 1.3-1.8 3-2.9 5-2.9 3.4 0 5.7 3.2 4.3 6.8-1.8 4.5-9.3 9.2-9.3 9.2Z" />
  ),
};

export function Icon({
  name,
  size = 22,
  strokeWidth = 2,
  filled = false,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
