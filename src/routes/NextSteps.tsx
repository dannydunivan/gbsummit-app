import { NEXT_STEPS } from '@/content/2026';
import { Icon } from '@/components/Icon';

/**
 * Next Steps — the Summit Book's promo pieces (pp. 12–17) as tappable cards.
 * Each card opens the destination its printed QR code points to.
 */
export function NextSteps() {
  return (
    <div>
      <header className="screen-header">
        <p className="eyebrow">Keep Growing</p>
        <h1>Next Steps</h1>
      </header>

      <div className="screen" style={{ paddingTop: 'var(--sp-sm)' }}>
        <p className="muted nextsteps-intro">
          Take Summit home with you — events, courses, and resources from General Baptist
          Ministries. Tap any card to learn more or register.
        </p>

        <ul className="list-reset stack">
          {NEXT_STEPS.map((n) => (
            <li key={n.id}>
              <a
                className="card card-pad nextstep-card"
                style={{ borderLeftColor: n.accent }}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{n.title}</h3>
                {n.meta && <p className="nextstep-meta">{n.meta}</p>}
                <p className="muted nextstep-body">{n.body}</p>
                <span className="nextstep-cta" style={{ color: n.accent }}>
                  Learn more <Icon name="external" size={14} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
