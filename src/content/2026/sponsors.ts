/**
 * Summit 2026 sponsors, from p.2 of the printed Summit Book ("Summit Book
 * Print Final.pdf", client-provided 2026-07-09). Tier order: Platinum (top),
 * no Gold this year, then Silver, then Bronze. Logos were extracted from the
 * same page into public/brand/sponsors/.
 */

export interface Sponsor {
  id: string;
  name: string;
  logo: string; // path under public/
}

export interface SponsorTier {
  id: string;
  label: string;
  sponsors: Sponsor[];
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'platinum',
    label: 'Platinum Sponsors',
    sponsors: [
      {
        id: 'gbif',
        name: 'General Baptist Investment Fund, Inc.',
        logo: '/brand/sponsors/gbif.jpg',
      },
      { id: 'brotherhood', name: 'Brotherhood Mutual', logo: '/brand/sponsors/brotherhood.jpg' },
      { id: 'westart', name: 'We Start Churches', logo: '/brand/sponsors/westart.jpg' },
    ],
  },
  {
    id: 'silver',
    label: 'Silver Sponsors',
    sponsors: [
      { id: 'womens', name: "Women's Ministries", logo: '/brand/sponsors/womens.jpg' },
      {
        id: 'stinson',
        name: 'Stinson Press — Printing & Publishing',
        logo: '/brand/sponsors/stinson.jpg',
      },
      {
        id: 'oldcaledonian',
        name: 'Old Caledonian Bed & Breakfast',
        logo: '/brand/sponsors/oldcaledonian.jpg',
      },
      {
        id: 'kissinger',
        name: 'Kissinger & Kirkman Investment Centre, LLC',
        logo: '/brand/sponsors/kissinger.jpg',
      },
    ],
  },
  {
    id: 'bronze',
    label: 'Bronze Sponsor',
    sponsors: [{ id: 'mnt', name: 'MNT Travel', logo: '/brand/sponsors/mnt.jpg' }],
  },
];
