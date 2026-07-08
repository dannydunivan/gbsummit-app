import { diningAreas } from '@/content/2026';
import { DetailHeader } from '@/components/DetailHeader';

export function Dining() {
  return (
    <div>
      <DetailHeader title="Where to Eat" />
      <div className="screen detail-screen">
        <p className="eyebrow">Meals on your own</p>
        <h1 className="detail-title">Where to Eat</h1>
        <p className="muted detail-desc">
          A few nearby spots for the on-your-own meals. Jackson is right around the venue; Cape
          Girardeau (about 15 minutes south) has more to choose from.
        </p>

        {diningAreas.map((area) => (
          <section key={area.city} className="dining-area">
            <div className="section-label">
              <h2>{area.city}</h2>
            </div>
            <p className="faint dining-distance">{area.distance}</p>
            <ul className="list-reset stack">
              {area.restaurants.map((r) => (
                <li key={r.name} className="card card-pad restaurant">
                  <div className="restaurant-name">{r.name}</div>
                  <div className="restaurant-cuisine">{r.cuisine}</div>
                  {r.note && <div className="muted restaurant-note">{r.note}</div>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
