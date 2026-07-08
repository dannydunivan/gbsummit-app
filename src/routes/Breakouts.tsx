import { breakouts } from '@/content/2026';
import { DetailHeader } from '@/components/DetailHeader';
import { Icon } from '@/components/Icon';

const blocks = [
  { session: 1 as const, label: 'Breakout Session 1', time: 'Tuesday · 1:30 PM' },
  { session: 2 as const, label: 'Breakout Session 2', time: 'Tuesday · 3:00 PM' },
];

export function Breakouts() {
  return (
    <div>
      <DetailHeader title="Breakouts" />
      <div className="screen detail-screen">
        <p className="eyebrow">Tuesday afternoon</p>
        <h1 className="detail-title">Breakout Catalog</h1>
        <p className="muted detail-desc">
          Five options in each block, across Connection Point and the Civic Center. Pick one per
          block.
        </p>

        {blocks.map((block) => (
          <section key={block.session} className="breakout-block">
            <div className="section-label">
              <h2>{block.label}</h2>
              <span className="faint breakout-block-time">{block.time}</span>
            </div>
            <ul className="list-reset stack">
              {breakouts
                .filter((b) => b.session === block.session)
                .map((b) => (
                  <li key={b.id} className="card card-pad breakout">
                    <h3>{b.title}</h3>
                    <p className="breakout-presenter">{b.presenter}</p>
                    <div className="breakout-location">
                      <Icon name="location" size={14} />
                      <span>{b.location}</span>
                    </div>
                    <p className="muted">{b.description}</p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
