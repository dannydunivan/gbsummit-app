import type { Speaker } from './types';

/**
 * Real Summit 2026 lineup and verbatim bios from gbsummit.org/speakers.
 * Headshots live in public/brand/speakers/ and are referenced by URL.
 */
export const speakers: Speaker[] = [
  // ----------------------------------------------------------- Keynotes
  {
    id: 'sp-cook',
    name: 'Clint Cook',
    role: 'Lead Pastor, Real Life Church',
    photo: '/brand/speakers/cook.jpg',
    bio: 'Clint Cook has served the Springfield community for over 40 years, leading Real Life Church since 1985 and helping shape its ministry across generations. He also served General Baptist Ministries in national leadership as Executive Director, providing steady guidance and encouragement to pastors and churches across the movement. A graduate of St. Louis Christian College, Clint is deeply committed to preaching the gospel, strengthening the local church, and helping leaders remain faithful in their calling. Clint and his wife, Judy, have been married since 1983 and are the proud parents of two children and seven grandchildren.',
    sessionIds: ['s-mon-s2', 's-tue-bo1'],
  },
  {
    id: 'sp-daniel',
    name: 'Vince Daniel',
    role: 'VP for National Missions, General Baptist Ministries',
    photo: '/brand/speakers/daniel.jpg',
    bio: 'Vince Daniel has served the Mountain Home community for over 15 years, founding and leading Real Life Church since its inception in 2011. Under his leadership, the church grew from a local school to a permanent 30,000-square-foot campus, along with The Reach Center, a community outreach and workforce reentry program. Since 2021, he has also served as the Vice President for National Missions with General Baptist Ministries, focusing on church planting and revitalization across the country. Vince and his wife, Jennifer, are longtime residents of North Central Arkansas and the parents of six children and four grandchildren.',
    sessionIds: ['s-mon-s1', 's-tue-bo2'],
  },
  {
    id: 'sp-dunivan',
    name: 'Dr. Danny Dunivan',
    role: 'President, General Baptist Ministries',
    photo: '/brand/speakers/dunivan.jpg',
    bio: 'Dr. Danny Dunivan has served the General Baptist movement for over 30 years, pastoring churches in Indiana and Missouri and contributing to multiple boards and ministries. Since 2021, he has led as President of General Baptist Ministries. Danny holds a B.A. in Religious Studies and an M.Div. from Oakland City University, and a Ph.D. in Historical Theology from Saint Louis University. He is deeply committed to leadership development, missions, and helping churches stay connected in the shared work of preaching the gospel. Danny and his wife Tara are proud parents to daughters Averee and Ella.',
    sessionIds: ['s-tue-s4'],
  },

  // ------------------------------------------------ Super Session Teachers
  {
    id: 'sp-clifton',
    name: 'Mark Clifton',
    role: 'Executive Director of Replant, North American Mission Board',
    photo: '/brand/speakers/clifton.jpg',
    bio: 'Mark Clifton serves as Executive Director of Replant at the North American Mission Board and is a Visiting Professor of Church Ministry at Midwestern Baptist Theological Seminary. With decades of experience as a pastor, church planter, and revitalization leader, he has helped plant and replant congregations across the U.S. and Canada and continues to coach and mentor leaders in renewal work. He is the author of Reclaiming Glory, co-author of Rubicons of Revitalization, and host of the Revitalize and Replant podcast. Mark is a graduate of William Jewell College and Midwestern Seminary, and he and his wife, Jill, live in Basehor with their family.',
    sessionIds: ['s-tue-super'],
  },
  {
    id: 'sp-lake',
    name: 'Mac Lake',
    role: 'Founder, The Multiply Group',
    photo: '/brand/speakers/lake.jpg',
    bio: 'Mac Lake is a Christian leadership development expert, author, and founder of The Multiply Group, helping churches build cultures and systems that multiply healthy leaders. With more than 30 years of ministry experience, he planted Carolina Forest Community Church in 1997 and later served as Leadership Development Pastor at Seacoast Church in Charleston, South Carolina. He also co-founded the LAUNCH Church Planting Network, later adopted by the North American Mission Board. Mac has written seven books, including The Multiplication Effect and Leading Yourself, and is known as a practical, encouraging communicator. Mac and his wife, Cindy, live in Charleston and have three children, including Christian music artist Brandon Lake.',
    sessionIds: ['s-tue-super'],
  },
  {
    id: 'sp-pratt',
    name: 'Dr. Jim Pratt',
    role: 'Director of Engagement & Mission One Coordinator, General Baptist Ministries',
    photo: '/brand/speakers/pratt.jpg',
    bio: 'Jim Pratt serves as Director of Engagement and Mission One Coordinator for General Baptist Ministries. He is a graduate of Oakland City University with a B.A. in Christian Education (with a minor in Business), a M.A.R. in Practical Studies, a M.Div. in Christian Education (with an added emphasis in counseling), and a Doctor of Ministry degree. He has led retreats and taught on Spiritual Formation at the church and university level, and co-authored a book, Called Out of the Cornfields. His greatest desire is to live his life loving God and loving others as Jesus commands. Jim has been married to his wife, Kris, for 35 years and they have one child, Katie, who is married to Pastor Justin Benefiel. Jim’s pride and joy are his three grandsons: Hudson, Parker, and Jackson.',
    sessionIds: ['s-tue-super'],
  },

  // ------------------------------------------------------ 4 x 10 Presenters
  {
    id: 'sp-brooks',
    name: 'Jarod Brooks',
    role: 'Connection Point Church',
    photo: '/brand/speakers/brooks.jpg',
    bio: 'Jarod Brooks of Connection Point Church is one of four pastors sharing in the fast-paced “4 x 10” session on Tuesday morning, and joins the “Church Planting Around the World” roundtable.',
    sessionIds: ['s-tue-s3'],
  },
  {
    id: 'sp-owens',
    name: 'Kellie Owens',
    role: 'Liberty Hill Church',
    photo: '/brand/speakers/owens.jpg',
    bio: 'Kellie Owens of Liberty Hill Church presents in the “4 x 10” session — four leaders, ten minutes each, one big idea apiece — and serves on the General Baptist Women’s Ministries board.',
    sessionIds: ['s-tue-s3'],
  },
  {
    id: 'sp-pusey',
    name: 'Phillip Pusey',
    role: 'Heavenly Highway General Baptist Church',
    photo: '/brand/speakers/pusey.jpg',
    bio: 'Phillip Pusey of Heavenly Highway General Baptist Church shares in the Tuesday morning “4 x 10” session and the “Church Planting Around the World” roundtable.',
    sessionIds: ['s-tue-s3'],
  },
  {
    id: 'sp-washington',
    name: 'Brennan Washington',
    role: 'City Light Church',
    photo: '/brand/speakers/washington.jpg',
    bio: 'Brennan Washington of City Light Church rounds out the “4 x 10” session lineup and joins the “Church Planting Around the World” roundtable on Tuesday.',
    sessionIds: ['s-tue-s3'],
  },
];

export const speakerById = (id: string) => speakers.find((s) => s.id === id);
