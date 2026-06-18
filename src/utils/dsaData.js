export const leetcodeStats = {
  username: 'kartik_dev',
  totalSolved: 342,
  totalProblems: 3343,
  easy: { solved: 145, total: 834 },
  medium: { solved: 162, total: 1752 },
  hard: { solved: 35, total: 757 },
  streak: 47,
  maxStreak: 68,
  ranking: 125432,
  contributions: 89,
  contests: [
    { name: 'Weekly 420', rating: 1682, rank: 4231, solved: 3 },
    { name: 'Weekly 419', rating: 1654, rank: 4892, solved: 2 },
    { name: 'Biweekly 142', rating: 1631, rank: 5102, solved: 3 },
    { name: 'Weekly 418', rating: 1610, rank: 5432, solved: 2 },
  ],
};

export const codeforcesStats = {
  username: 'kartik_cf',
  rating: 1423,
  maxRating: 1487,
  rank: 'Pupil',
  totalSolved: 287,
  contests: 32,
  contributions: 12,
  friends: 47,
  recentRating: [
    { contest: 'Round 1010', rating: 1423, delta: '+12' },
    { contest: 'Round 1005', rating: 1411, delta: '-8' },
    { contest: 'Round 1000', rating: 1419, delta: '+23' },
    { contest: 'Round 995', rating: 1396, delta: '+15' },
    { contest: 'Round 990', rating: 1381, delta: '-5' },
  ],
};

export const codechefStats = {
  username: 'kartik_cc',
  rating: 1720,
  maxRating: 1785,
  stars: 3,
  totalSolved: 215,
  contests: 28,
  globalRank: 4523,
  countryRank: 892,
};

export const githubStats = {
  username: 'kartik-dev',
  totalContributions: 847,
  thisYear: 312,
  repos: 23,
  stars: 156,
  forks: 89,
  streak: 12,
  languages: [
    { name: 'JavaScript', pct: 38 },
    { name: 'Python', pct: 28 },
    { name: 'TypeScript', pct: 18 },
    { name: 'Java', pct: 10 },
    { name: 'C++', pct: 6 },
  ],
};

export function generateHeatmapData() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 91; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const count = Math.floor(Math.random() * 8);
    days.push({ date: d.toISOString().split('T')[0], count });
  }
  return days.reverse();
}

export const subjectProgress = [
  { name: 'Arrays', solved: 48, total: 60, pct: 80 },
  { name: 'Strings', solved: 35, total: 45, pct: 78 },
  { name: 'Linked Lists', solved: 28, total: 35, pct: 80 },
  { name: 'Stacks & Queues', solved: 22, total: 30, pct: 73 },
  { name: 'Trees', solved: 38, total: 50, pct: 76 },
  { name: 'Graphs', solved: 25, total: 40, pct: 63 },
  { name: 'DP', solved: 42, total: 60, pct: 70 },
  { name: 'Greedy', solved: 30, total: 38, pct: 79 },
];
