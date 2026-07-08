/**
 * Nearby dining for meals-on-your-own. Jackson is the host town; Cape Girardeau
 * (~15 min south) has a wider selection.
 *
 * All entries and addresses verified as real, currently-operating spots (via
 * Yelp/Tripadvisor/official sites, July 2026). Client curates the list; hours
 * intentionally omitted (they drift) except day-closures worth flagging.
 */

export interface Restaurant {
  name: string;
  cuisine: string;
  address: string;
  note?: string;
}

export interface DiningArea {
  city: string;
  distance: string;
  restaurants: Restaurant[];
  coffeeAndDessert: Restaurant[];
}

export const diningAreas: DiningArea[] = [
  {
    city: 'Jackson, MO',
    distance: 'In town · closest to the venue',
    restaurants: [
      {
        name: 'Tractors Classic American Grill',
        cuisine: 'American · burgers & steaks',
        address: '124 S High St, Jackson, MO 63755',
        note: 'Home of the “Massive Ferguson” burger.',
      },
      {
        name: 'Hickory House',
        cuisine: 'BBQ · from-scratch comfort food',
        address: '2259 E Jackson Blvd, Jackson, MO 63755',
      },
      {
        name: 'T-Ravs',
        cuisine: 'Italian · toasted ravioli & St. Louis-style pizza',
        address: '3582 E Jackson Blvd, Jackson, MO 63755',
        note: 'Creek-side patio.',
      },
      {
        name: 'Las Brisas Mexican Restaurant',
        cuisine: 'Mexican',
        address: '5847 US Hwy 61, Jackson, MO 63755',
      },
      {
        name: 'Tokyo Sushi Steakhouse',
        cuisine: 'Japanese · hibachi & sushi',
        address: '1815 E Jackson Blvd, Jackson, MO 63755',
        note: 'Closed Mondays.',
      },
      {
        name: 'Pizza Inn',
        cuisine: 'Pizza buffet',
        address: '196 Drury Ln, Jackson, MO 63755',
      },
      {
        name: 'Wings Etc.',
        cuisine: 'Wings & ribs · family-friendly grill',
        address: '2003 E Jackson Blvd, Jackson, MO 63755',
      },
      {
        name: 'Wib’s Drive-In',
        cuisine: 'BBQ · local institution',
        address: '1204 N High St, Jackson, MO 63755',
        note: 'Known for the BBQ pork shoulder sandwich.',
      },
      {
        name: 'Dexter Bar-B-Que',
        cuisine: 'BBQ · slow-smoked since the 1970s',
        address: '2305 E Jackson Blvd, Jackson, MO 63755',
      },
    ],
    coffeeAndDessert: [
      {
        name: 'The Ground-A-Bout',
        cuisine: 'Coffee shop & roastery · breakfast and lunch café',
        address: '107 E Adams St, Jackson, MO 63755',
        note: 'Local roastery in the historic 1928 Marquette Tower.',
      },
      {
        name: 'American Ice Cream & More',
        cuisine: 'Ice cream · diner classics',
        address: '221 S Hope St, Jackson, MO 63755',
        note: 'Closed Mondays.',
      },
    ],
  },
  {
    city: 'Cape Girardeau, MO',
    distance: '~15 min south · wider selection',
    restaurants: [
      {
        name: 'The Southerner',
        cuisine: 'Southern bistro',
        address: '3351 Percy Dr, Cape Girardeau, MO 63701',
        note: 'At the Drury Plaza Hotel.',
      },
      {
        name: 'Cracker Barrel',
        cuisine: 'American · country cooking',
        address: '3261 William St, Cape Girardeau, MO 63703',
      },
      {
        name: 'Texas Roadhouse',
        cuisine: 'Steakhouse',
        address: '13 Doctors Park Dr, Cape Girardeau, MO 63703',
      },
      {
        name: 'Chili’s',
        cuisine: 'Tex-Mex & American',
        address: '3093 William St, Cape Girardeau, MO 63703',
      },
    ],
    coffeeAndDessert: [
      {
        name: 'Red Banner Coffee Roasters',
        cuisine: 'Coffee roastery & café',
        address: '1 N Spanish St, Cape Girardeau, MO 63701',
        note: 'Historic downtown, a block from the riverfront.',
      },
      {
        name: 'Victoria’s Creamery',
        cuisine: 'Ice cream parlor',
        address: '137 N Main St, Cape Girardeau, MO 63701',
        note: 'Historic downtown, near the riverfront.',
      },
      {
        name: 'Starbucks',
        cuisine: 'Coffee',
        address: '188 Vantage Dr, Cape Girardeau, MO 63701',
        note: 'Off I-55 & William St · also at 202 Siemens Dr.',
      },
      {
        name: 'Crumbl Cookies',
        cuisine: 'Cookies & desserts',
        address: '3324 Campster Dr, Cape Girardeau, MO 63701',
      },
      {
        name: 'Andy’s Frozen Custard',
        cuisine: 'Frozen custard',
        address: '809 N Kingshighway St, Cape Girardeau, MO 63701',
      },
    ],
  },
];
