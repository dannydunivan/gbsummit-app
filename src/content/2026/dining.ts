/**
 * Nearby dining for meals-on-your-own. Jackson is the host town; Cape Girardeau
 * (~15 min south) has a wider selection.
 *
 * All entries verified as real, currently-operating spots (via Tripadvisor/
 * Yelp, July 2026). Which ones to feature — and any to add — is the client's
 * call. Edit freely; hours intentionally omitted (they drift).
 */

export interface Restaurant {
  name: string;
  cuisine: string;
  note?: string;
}

export interface DiningArea {
  city: string;
  distance: string;
  restaurants: Restaurant[];
}

export const diningAreas: DiningArea[] = [
  {
    city: 'Jackson, MO',
    distance: 'In town · closest to the venue',
    restaurants: [
      { name: 'Tractors Classic American Grill', cuisine: 'American · burgers & steaks', note: 'Home of the “Massive Ferguson” burger.' },
      { name: 'Hickory House', cuisine: 'BBQ · from-scratch comfort food' },
      { name: 'Wings Etc.', cuisine: 'Grill & pub · wings, ribs', note: 'Family-friendly.' },
      { name: 'Wib’s Drive-In', cuisine: 'BBQ · local institution', note: 'Known for the BBQ pork shoulder sandwich.' },
      { name: 'Dexter Bar-B-Que', cuisine: 'BBQ · slow-smoked since the 1970s' },
    ],
  },
  {
    city: 'Cape Girardeau, MO',
    distance: '~15 min south · wider selection',
    restaurants: [
      { name: 'The Southerner', cuisine: 'Upscale Southern', note: 'In the Drury Plaza Convention Hotel.' },
      { name: 'Gabriel’s Food + Wine', cuisine: 'Italian & global' },
      { name: 'Katy O’Ferrell’s Publick House', cuisine: 'Irish pub · downtown' },
      { name: 'Ebb & Flow Fermentations', cuisine: 'Brewpub · downtown' },
      { name: '36 Restaurant & Bar', cuisine: 'Fine dining' },
    ],
  },
];
