import type { SessionType } from '@/content/2026';

const LABELS: Record<SessionType, string> = {
  worship: 'Worship',
  keynote: 'Main Session',
  training: 'Training',
  business: 'General Association',
  kids: 'Kids',
  youth: 'Youth',
  break: 'Break',
};

/** Colored session-type pill. Colors come from CSS vars (--type-<type>-*). */
export function TypeTag({ type }: { type: SessionType }) {
  return (
    <span
      className="tag"
      style={{
        color: `var(--type-${type}-fg)`,
        background: `var(--type-${type}-bg)`,
      }}
    >
      {LABELS[type]}
    </span>
  );
}
