import { diningAreas, type Restaurant } from '@/content/2026';
import { DetailHeader } from '@/components/DetailHeader';
import { Icon } from '@/components/Icon';

/** Address line, tappable — opens the spot in Google Maps. */
function AddressLink({ r }: { r: Restaurant }) {
  const maps =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${r.name}, ${r.address}`);
  return (
    <a className="restaurant-address" href={maps} target="_blank" rel="noreferrer">
      <Icon name="location" size={13} />
      <span>{r.address}</span>
    </a>
  );
}

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <li className="card card-pad restaurant">
      <div className="restaurant-name">{r.name}</div>
      <div className="restaurant-cuisine">{r.cuisine}</div>
      <AddressLink r={r} />
      {r.note && <div className="muted restaurant-note">{r.note}</div>}
    </li>
  );
}

export function Dining() {
  return (
    <div>
      <DetailHeader title="Where to Eat" />
      <div className="screen detail-screen">
        <p className="eyebrow">Meals on your own</p>
        <h1 className="detail-title">Where to Eat</h1>
        <p className="muted detail-desc">
          A few nearby spots for the on-your-own meals. Jackson is right around the venue; Cape
          Girardeau (about 15 minutes south) has more to choose from. Tap an address for
          directions.
        </p>

        {diningAreas.map((area) => (
          <section key={area.city} className="dining-area">
            <div className="section-label">
              <h2>{area.city}</h2>
            </div>
            <p className="faint dining-distance">{area.distance}</p>
            <ul className="list-reset stack">
              {area.restaurants.map((r) => (
                <RestaurantCard key={r.name} r={r} />
              ))}
            </ul>

            {area.coffeeAndDessert.length > 0 && (
              <>
                <h3 className="dining-sub">Coffee &amp; Dessert</h3>
                <ul className="list-reset stack">
                  {area.coffeeAndDessert.map((r) => (
                    <RestaurantCard key={r.name} r={r} />
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
