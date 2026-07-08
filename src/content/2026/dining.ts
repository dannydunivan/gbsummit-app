/**
 * Nearby dining for meals-on-your-own. Jackson is the host town; Cape Girardeau
 * (~15 min south) has a wider selection.
 *
 * NOTE: This is a STARTER list to be vetted/curated by the client — names are
 * real local spots but hours, and whether to feature each one, are the client's
 * call. Edit freely; add/remove entries here.
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
      { name: 'El Sol de Jalisco', cuisine: 'Mexican' },
      { name: 'Bella Italia', cuisine: 'Italian' },
    ],
  },
  {
    city: 'Cape Girardeau, MO',
    distance: '~15 min south · wider selection',
    restaurants: [
      { name: 'The Southerner', cuisine: 'Upscale Southern', note: 'In the Drury Plaza Convention Hotel.' },
      { name: 'Gabriel’s Food + Wine', cuisine: 'Italian & global' },
      { name: 'Katy O’Ferrell’s', cuisine: 'Irish pub · downtown' },
      { name: 'Ebb & Flow Fermentations', cuisine: 'Brewery & taproom' },
      { name: '36 Restaurant & Bar', cuisine: 'American · riverfront' },
      { name: 'Cracker Barrel', cuisine: 'American · off I-55' },
    ],
  },
];
