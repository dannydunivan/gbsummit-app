import { Link } from 'react-router-dom';
import { VENUES, programs } from '@/content/2026';
import { Icon } from '@/components/Icon';

export function Info() {
  return (
    <div>
      <header className="screen-header">
        <p className="eyebrow">Event Guide</p>
        <h1>Info</h1>
      </header>

      <div className="screen" style={{ paddingTop: 'var(--sp-sm)' }}>
        {/* Venues — two sites on the same street */}
        <section>
          <div className="section-label">
            <h2>Venues</h2>
          </div>
          <div className="stack">
            {[VENUES.main, VENUES.civic].map((v) => (
              <div key={v.name} className="card card-pad venue-item">
                <div className="venue-item-head">
                  <Icon name="location" size={18} />
                  <div>
                    <div className="venue-name">{v.name}</div>
                    <div className="venue-role">{v.role}</div>
                  </div>
                </div>
                <div className="muted venue-addr">{v.address}</div>
                <p className="muted venue-blurb">{v.blurb}</p>
              </div>
            ))}
          </div>
          <p className="faint venue-foot">
            The two sites sit directly across E Deerwood Dr. from each other — an easy walk between.
          </p>
        </section>

        {/* Kids & Youth */}
        <section>
          <div className="section-label">
            <h2>Kids &amp; Youth</h2>
          </div>
          <div className="stack">
            {programs.map((p) => (
              <div key={p.id} className="card card-pad program">
                <div className="program-head">
                  <div>
                    <div className="program-title">{p.title}</div>
                    <div className="faint program-audience">
                      {p.audience} · {p.location}
                    </div>
                  </div>
                </div>
                <ul className="list-reset program-days">
                  {p.days.map((d) => (
                    <li key={d.day} className="program-day">
                      <div className="program-day-name">{d.day}</div>
                      <ul className="list-reset program-times">
                        {d.items.map((it) => (
                          <li key={it} className="program-time">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                {p.note && <p className="program-note">{p.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Links out */}
        <section>
          <div className="quick-grid" style={{ marginTop: 'var(--sp-md)' }}>
            <Link to="/maps" className="quick-tile card">
              <Icon name="pin" size={22} />
              <span>Venue Maps</span>
            </Link>
            <Link to="/dining" className="quick-tile card">
              <Icon name="location" size={22} />
              <span>Where to Eat</span>
            </Link>
            <Link to="/contact" className="quick-tile card">
              <Icon name="info" size={22} />
              <span>Ask a Question</span>
            </Link>
            <Link to="/sponsors" className="quick-tile card">
              <Icon name="heart" size={22} />
              <span>Our Sponsors</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
