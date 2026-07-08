import type { Speaker } from '@/content/2026';

function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Round headshot with an initials fallback. */
export function SpeakerAvatar({ speaker, size = 56 }: { speaker: Speaker; size?: number }) {
  const style = { width: size, height: size } as const;
  if (speaker.photo) {
    return (
      <img
        className="avatar"
        style={style}
        src={speaker.photo}
        alt={speaker.name}
        loading="lazy"
        width={size}
        height={size}
      />
    );
  }
  return (
    <span className="avatar avatar-fallback" style={{ ...style, fontSize: size * 0.36 }} aria-hidden="true">
      {initials(speaker.name)}
    </span>
  );
}
