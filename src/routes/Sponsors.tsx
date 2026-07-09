import { SPONSOR_TIERS } from '@/content/2026';

/**
 * Sponsors page — tiers in rank order (Platinum, Silver, Bronze; no Gold in
 * 2026). Logos are full lockups extracted from the printed Summit Book, so
 * the card shows the logo alone with the sponsor name as alt text.
 */
export function Sponsors() {
  return (
    <div>
      <header className="screen-header">
        <p className="eyebrow">Summit 2026</p>
        <h1>Our Sponsors</h1>
      </header>

      <div className="screen" style={{ paddingTop: 'var(--sp-sm)' }}>
        <p className="muted sponsors-intro">
          Summit 2026 is made possible by the generous support of these ministry partners.
        </p>

        {SPONSOR_TIERS.map((tier) => (
          <section key={tier.id}>
            <div className="section-label">
              <h2>
                <span className={`tier-dot tier-dot-${tier.id}`} aria-hidden="true" />
                {tier.label}
              </h2>
            </div>
            <ul className="list-reset stack">
              {tier.sponsors.map((s) => (
                <li key={s.id} className={`card sponsor-card sponsor-card-${tier.id}`}>
                  <img className="sponsor-logo" src={s.logo} alt={s.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="faint sponsors-foot">Thank you for supporting General Baptist Ministries.</p>
      </div>
    </div>
  );
}
