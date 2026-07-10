/**
 * Render announcement body text with URLs as tappable links. Long URLs get a
 * short readable label (host + a hint of the path); the href keeps the full
 * URL. Needed because announcements are team-authored (GitHub web UI) and may
 * contain raw links, e.g. a feedback-survey URL.
 */
const URL_RE = /(https?:\/\/[^\s]+)/g;

function label(url: string): string {
  try {
    const u = new URL(url);
    const host = u.host.replace(/^www\./, '');
    const path = u.pathname.length > 1 ? u.pathname : '';
    const short = host + path;
    return short.length > 34 ? `${short.slice(0, 32)}…` : short;
  } catch {
    return url;
  }
}

export function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return part;
        // Keep trailing punctuation out of the link.
        const trimmed = part.replace(/[.,;:!?)]+$/, '');
        const trailing = part.slice(trimmed.length);
        return (
          <span key={i}>
            <a href={trimmed} target="_blank" rel="noopener noreferrer" className="body-link">
              {label(trimmed)}
            </a>
            {trailing}
          </span>
        );
      })}
    </>
  );
}
