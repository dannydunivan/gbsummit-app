import { VENUES } from '@/content/2026';
import { Icon } from '@/components/Icon';

/**
 * Venue floor plans, extracted from the printed Summit Book (pp. 18–19).
 * Maps are wider than a phone, so each sits in a horizontally pannable
 * container at a width where the room labels stay legible; pinch-zoom also
 * works (viewport allows scaling).
 */
const MAPS = [
  {
    id: 'cpc',
    venue: VENUES.main,
    image: '/brand/maps/cpc.png',
    alt: 'Floor plan of Connection Point Church: Entry and Lobby in the center, Worship Center to the right, Cafe and restrooms at the top right, Kid’s areas (K–3rd, 4th–6th, Kid’s Lobby, Nursery, 2 years, 3 years, Special Needs) on the left wing.',
  },
  {
    id: 'civic',
    venue: VENUES.civic,
    image: '/brand/maps/civic.png',
    alt: 'Floor plan of the Jackson Civic Center: Entry at the bottom, Gym on the left, Lounge and Conference Room near the entry, Meeting Room North and Meeting Room South on the right, restrooms in the center.',
  },
];

export function Maps() {
  return (
    <div>
      <header className="screen-header">
        <p className="eyebrow">Find Your Way</p>
        <h1>Maps</h1>
      </header>

      <div className="screen" style={{ paddingTop: 'var(--sp-sm)' }}>
        <p className="muted maps-intro">
          Rooms are labeled in red. Drag a map sideways to explore, or pinch to zoom.
        </p>

        {MAPS.map((m) => (
          <section key={m.id} className="map-section">
            <div className="section-label">
              <h2>{m.venue.name}</h2>
            </div>
            <p className="faint map-addr">
              <Icon name="location" size={13} /> {m.venue.address}
            </p>
            <div className="card map-card">
              <div className="map-scroll">
                <img className="map-img" src={m.image} alt={m.alt} loading="lazy" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
