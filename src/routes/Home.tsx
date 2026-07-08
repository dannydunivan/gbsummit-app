import { Link } from 'react-router-dom';
import { EVENT } from '@/content/2026';
import { appNow, comingUpNext, relativeTime } from '@/lib/time';
import { useAnnouncements } from '@/state/announcements';
import { SessionCard } from '@/components/SessionCard';
import { Icon } from '@/components/Icon';
import { InstallCard } from '@/components/InstallCard';

export function Home() {
  const now = appNow();
  const next = comingUpNext(now);
  const { announcements, markAllRead } = useAnnouncements();
  const pinned = announcements.find((a) => a.pinned);
  const recent = announcements.filter((a) => !a.pinned).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <header className="home-hero">
        <img className="home-hero-bg" src="/brand/summit-hero.png" alt="" aria-hidden="true" />
        <div className="home-hero-scrim" />
        <div className="home-hero-content">
          <img className="home-logo" src="/brand/summit26-logo.png" alt="Summit 26" />
          <p className="home-hero-dates">{EVENT.datesLabel}</p>
          <p className="home-hero-venue">
            {EVENT.venueName} · {EVENT.venueShort}
          </p>
        </div>
      </header>

      <div className="screen home-screen">
        {/* Coming up next */}
        {next && (
          <section>
            <div className="section-label">
              <h2>{next.live ? 'Happening Now' : 'Coming Up Next'}</h2>
              <Link to="/schedule" className="link-more">
                Full schedule <Icon name="chevron" size={14} />
              </Link>
            </div>
            <SessionCard session={next.session} live={next.live} />
          </section>
        )}

        {/* Install / alerts onboarding */}
        <InstallCard />

        {/* Announcements */}
        <section>
          <div className="section-label">
            <h2>Announcements</h2>
            <button className="link-more" onClick={markAllRead}>
              Mark read
            </button>
          </div>

          {pinned && (
            <article className="card card-pad announcement announcement-pinned">
              <div className="announcement-top">
                <span className="tag tag-pinned">
                  <Icon name="pin" size={12} /> Pinned
                </span>
                <span className="faint announcement-time">{relativeTime(pinned.timestamp, now)}</span>
              </div>
              <h3>{pinned.title}</h3>
              <p className="muted">{pinned.body}</p>
            </article>
          )}

          <ul className="list-reset stack" style={{ marginTop: 'var(--sp-md)' }}>
            {recent.map((a) => (
              <li key={a.id} className="card card-pad announcement">
                <div className="announcement-top">
                  <h3>{a.title}</h3>
                  <span className="faint announcement-time">{relativeTime(a.timestamp, now)}</span>
                </div>
                <p className="muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick links */}
        <section>
          <div className="section-label">
            <h2>Quick Links</h2>
          </div>
          <div className="quick-grid">
            <Link to="/schedule" className="quick-tile card">
              <Icon name="calendar" size={22} />
              <span>Schedule</span>
            </Link>
            <Link to="/info" className="quick-tile card">
              <Icon name="info" size={22} />
              <span>Venues & Kids</span>
            </Link>
            <Link to="/dining" className="quick-tile card">
              <Icon name="location" size={22} />
              <span>Where to Eat</span>
            </Link>
            <Link to="/contact" className="quick-tile card">
              <Icon name="bell" size={22} />
              <span>Ask a Question</span>
            </Link>
          </div>
        </section>

        <footer className="home-footer faint">
          {EVENT.org} · {EVENT.name}
        </footer>
      </div>
    </div>
  );
}
