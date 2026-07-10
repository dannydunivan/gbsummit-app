/**
 * "Next Steps" — the promotional pieces from pp. 12–17 of the printed Summit
 * Book, as tappable cards. Every title/date/description is taken from the
 * printed piece; each `url` was decoded from that piece's QR code
 * (bit.ly links resolved to their destinations and verified 200 on
 * 2026-07-10). `accent` echoes the artwork's dominant color.
 */

export interface NextStep {
  id: string;
  title: string;
  meta?: string; // date / location line
  body: string;
  url: string;
  accent: string;
}

export const NEXT_STEPS: NextStep[] = [
  {
    id: 'church-health',
    title: 'Schedule a Free Church Health Checkup',
    body: 'The Church Health Assessment is a free resource designed to help pastors gain clarity and identify next steps for the health of the church.',
    url: 'https://www.generalbaptist.com/church-health',
    accent: '#3fa15c',
  },
  {
    id: 'regional-events',
    title: 'Regional One Day Events',
    meta: 'Fall 2026 · four regions',
    body: 'Practical leadership conversations, ministry connection, and shared learning — Sept 26 (Boonville, IN), Oct 3 (Paragould, AR), Oct 24 (O’Fallon, IL), Nov 14 (Portland, TN).',
    url: 'https://www.generalbaptist.com/regional-events',
    accent: '#2f7fc1',
  },
  {
    id: 'cld-courses',
    title: 'Class Is Back in Session',
    meta: 'Fall semester begins August 24, 2026',
    body: 'Church Leadership Development online courses combine practical ministry training with biblical and leadership foundations — flexible learning for real ministry life.',
    url: 'https://courses.clpathway.com/library/',
    accent: '#86b53f',
  },
  {
    id: 'multiply-cohort',
    title: 'Multiply Cohort',
    meta: 'Church Leadership Network',
    body: 'Leadership foundations for greater missional impact: monthly coaching calls with Pastor Clint Cook, collaborative learning with other pastors, and two in-person gatherings each year.',
    url: 'https://secure.qgiv.com/for/multiplycohort/event/cohortforpastors/',
    accent: '#1d9a9c',
  },
  {
    id: 'leadership-assessment',
    title: 'Invest in the Leader You’re Becoming',
    meta: 'September 14–16, 2026 · Center Point Church, Hendersonville, TN',
    body: 'The Church Leadership Assessment helps pastors and ministry leaders identify strengths, uncover blind spots, and grow in their ability to lead healthy, impactful ministries.',
    url: 'https://secure.qgiv.com/for/churchleadershipassessment/event/churchleadershipassessment/',
    accent: '#e0b419',
  },
  {
    id: 'leadership-conference',
    title: 'Church Leadership Conference',
    meta: 'February 1–3, 2027 · Hilton Garden Inn Destin Miramar Beach',
    body: 'Space for pastors and ministry leaders to step away from the pace of ministry and invest in leadership, relationships, encouragement, and renewal.',
    url: 'https://secure.qgiv.com/for/churchleadershipconference/',
    accent: '#2a9d8f',
  },
];
