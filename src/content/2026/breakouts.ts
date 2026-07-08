import type { Breakout } from './types';

/**
 * Breakout offerings from gbsummit.org. Each is slotted into its Tuesday block
 * (Session 1 @ 1:30 PM, Session 2 @ 3:00 PM) with its room location — some at
 * Connection Point Church, some across the road at the Civic Center.
 */
export const breakouts: Breakout[] = [
  // -------------------------------------------- Breakout Session 1 · 1:30 PM
  {
    id: 'bo-women',
    title: 'Created for the Call: Saying Yes to the Mission of God',
    presenter: 'Kris Pratt — President, GB Women’s Ministries (with India Goostree & Kellie Owens)',
    location: 'Connection Point — Kids K–3rd Room',
    session: 1,
    description:
      'Join GB Women for a multi-generational conversation about the call of women to build and strengthen the Church in every season. Hear from missionaries, moms, single and married women, and grandmothers as they share stories of faith and obedience, and how God uses our simple “yes” to transform communities and nations.',
  },
  {
    id: 'bo-planting-world',
    title: 'Church Planting Around the World',
    presenter: 'Vince Daniel — VP for National Missions (with Brennan Washington, Jarod Brooks, Phillip Pusey, Rodney Walls)',
    location: 'Connection Point — Café',
    session: 1,
    description:
      'Church planting is never one-size-fits-all. In this roundtable, Vince Daniel hosts a conversation on how the mission of God takes shape across different communities, cultures, and contexts — giving leaders a broader vision and practical insight for reaching people wherever God has called them.',
  },
  {
    id: 'bo-bivocational',
    title: 'Bivocational Ministry: Two Roles, One Calling',
    presenter: 'Chris Wunderlich — Executive Pastor, Liberty Hill Church',
    location: 'Civic Center — Meeting Room North',
    session: 1,
    description:
      'Discover how a unified, theologically grounded calling transforms bi-vocational ministry from exhausting multitasking into meaningful integration — with a fresh vision and practical tools to faithfully navigate work and ministry as one life, one mission, one calling.',
  },
  {
    id: 'bo-print-digital',
    title: 'Connecting Church and Community Through Print and Digital',
    presenter: 'Levi Casey — General Manager, Stinson Press (with Aaron Dickinson & Preston Owens)',
    location: 'Civic Center — Meeting Room South',
    session: 1,
    description:
      'Churches must reach beyond Sunday mornings to connect with their communities. This session explores how strategic marketing — combining print (banners, apparel, signage, direct mail) with digital tools (social media, websites, email, online ads) — creates a unified message that builds trust, increases visibility, and makes your church’s message impossible to ignore.',
  },
  {
    id: 'bo-gbif',
    title: 'Strengthening Our Churches: Investing In and With GBIF',
    presenter: 'Trent Holcomb — President, General Baptist Investment Fund',
    location: 'Civic Center — Lounge',
    session: 1,
    description:
      'What if your church’s savings could do more than earn interest? Trent Holcomb shares how GBIF fuels church plants, revitalization, and growth across the General Baptist family — where GBIF has been, where it’s headed, and how your investment can help build the Kingdom while generating strong returns.',
  },

  // -------------------------------------------- Breakout Session 2 · 3:00 PM
  {
    id: 'bo-kids',
    title: 'Put the Fun in Kid’s Ministry',
    presenter: 'Kevin Detweiler & Faith Woodall — Children’s Pastors, Connection Point Church',
    location: 'Connection Point — Kids K–3rd Room',
    session: 2,
    description:
      'Discover how children’s ministry can be both deeply meaningful and incredibly fun. This interactive breakout equips kids-ministry leaders with creative, Christ-centered tools — storytelling, skits, object lessons, visuals, and hands-on experiences — to help the Gospel come alive for kids.',
  },
  {
    id: 'bo-arrows',
    title: 'Letting The Arrows Fly',
    presenter: 'Casey Cariker — Lead Pastor, Rejoice Church; We Start Churches Board',
    location: 'Connection Point — Café',
    session: 2,
    description:
      'A church’s greatest impact is not only measured by who it gathers, but by who it sends. This breakout will help pastors and church leaders develop a sending culture that raises up leaders, releases people into mission, and starts new churches that pioneer gospel-centered change in new communities.',
  },
  {
    id: 'bo-vision',
    title: 'Victory in the Vision',
    presenter: 'Michael Simmons — Pastor, Rector First General Baptist Church',
    location: 'Civic Center — Meeting Room North',
    session: 2,
    description:
      'When churches prepare for what they have been praying for, vision moves from hope to transformation. This breakout challenges rural pastors and leaders to move beyond being stuck in the past and embrace practical, faithful strategies for building a thriving church and community.',
  },
  {
    id: 'bo-invite',
    title: 'How Healthy Churches Build an Invite Culture That Lasts',
    presenter: 'Jason Taylor — Lead Pastor, Vertical Church; We Start Churches Board',
    location: 'Civic Center — Meeting Room South',
    session: 2,
    description:
      'Healthy churches don’t grow by accident — they build momentum through intentional, repeatable rhythms. This breakout equips leaders to create an invite culture that empowers everyday believers to welcome others, make disciples, and carry the mission of Jesus into everyday life.',
  },
  {
    id: 'bo-moses-jethro',
    title: 'The Moses & Jethro Effect: Gaining Outside Wisdom for Greater Leadership',
    presenter: 'Clint Cook — Lead Pastor, Real Life Church',
    location: 'Civic Center — Lounge',
    session: 2,
    description:
      'Even the most faithful and capable leaders need trusted voices from outside their context. Drawing from Moses and Jethro, this session explores how leaders can gain clarity, avoid burnout, and make wiser decisions by embracing outside perspective, coaching, and counsel.',
  },
];
