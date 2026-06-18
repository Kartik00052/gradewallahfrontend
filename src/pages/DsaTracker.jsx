import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInRight, scalePop } from '../motion';
import { useAnimatedInView, useCountUp } from '../motion';
import { ProgressRing, Heatmap, SkillGraph } from '../components';
import {
  leetcodeStats,
  codeforcesStats,
  codechefStats,
  githubStats,
  subjectProgress,
} from '../utils/dsaData';

function ProfileHeader({ platform, username, rating, maxRating, rank, logo, color }) {
  return (
    <motion.div className="dsa-profile" variants={scalePop} initial="initial" animate="animate" whileHover={{ y: -2 }}>
      <div className="dsa-profile-left">
        <span className="dsa-profile-logo" style={{ backgroundColor: `${color}15` }}>{logo}</span>
        <div className="dsa-profile-info">
          <span className="dsa-profile-platform">{platform}</span>
          <span className="dsa-profile-username">@{username}</span>
        </div>
      </div>
      <div className="dsa-profile-right">
        {rating != null && (
          <>
            <span className="dsa-profile-rating">{rating}</span>
            {maxRating && <span className="dsa-profile-max">max {maxRating}</span>}
          </>
        )}
        {rank && <span className="dsa-profile-rank" style={{ color }}>{rank}</span>}
      </div>
    </motion.div>
  );
}

function LeetCodeSection() {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });
  const totalSolvedAnim = useCountUp(leetcodeStats.totalSolved, { duration: 1200, enabled: inView });
  const streakAnim = useCountUp(leetcodeStats.streak, { duration: 800, enabled: inView });

  const difficultyData = useMemo(
    () => [
      { label: 'Easy', solved: leetcodeStats.easy.solved, total: leetcodeStats.easy.total, color: '#22c55e' },
      { label: 'Medium', solved: leetcodeStats.medium.solved, total: leetcodeStats.medium.total, color: '#f59e0b' },
      { label: 'Hard', solved: leetcodeStats.hard.solved, total: leetcodeStats.hard.total, color: '#ef4444' },
    ],
    []
  );

  return (
    <div className="dsa-platform-section" ref={ref}>
      <ProfileHeader platform="LeetCode" username={leetcodeStats.username} rating={leetcodeStats.ranking} rank="Knight" logo="⚡" color="#f59e0b" />
      <div className="dsa-stats-row">
        <div className="dsa-stat-big">
          <motion.span className="dsa-stat-big-value" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {inView ? totalSolvedAnim : 0}
          </motion.span>
          <span className="dsa-stat-big-label">Total Solved</span>
        </div>
        <div className="dsa-stat-big">
          <motion.span className="dsa-stat-big-value">
            {inView ? streakAnim : 0}
          </motion.span>
          <span className="dsa-stat-big-label">Day Streak</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{leetcodeStats.totalProblems}</span>
          <span className="dsa-stat-big-label">Total Problems</span>
        </div>
      </div>
      <div className="dsa-difficulty-row">
        {difficultyData.map((d) => (
          <div key={d.label} className="dsa-difficulty-item">
            <ProgressRing value={d.solved} max={d.total} size={64} strokeWidth={5} label={d.label} sub={`${d.solved}/${d.total}`} color={d.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContestTimeline({ contests, color }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="dsa-contest-list">
      {contests.map((c, i) => (
        <motion.div
          key={c.contest}
          className="dsa-contest-row"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
        >
          <span className="dsa-contest-name">{c.contest}</span>
          <span className="dsa-contest-rating" style={{ color }}>{c.rating}</span>
          <span className={`dsa-contest-delta ${c.delta?.startsWith('+') ? 'positive' : 'negative'}`}>{c.delta || ''}</span>
        </motion.div>
      ))}
    </div>
  );
}

function CodeforcesSection() {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });
  const solvedAnim = useCountUp(codeforcesStats.totalSolved, { duration: 1000, enabled: inView });
  const contestsAnim = useCountUp(codeforcesStats.contests, { duration: 800, enabled: inView });

  return (
    <div className="dsa-platform-section" ref={ref}>
      <ProfileHeader platform="Codeforces" username={codeforcesStats.username} rating={codeforcesStats.rating} maxRating={codeforcesStats.maxRating} rank={codeforcesStats.rank} logo="💪" color="#6366f1" />
      <div className="dsa-stats-row">
        <div className="dsa-stat-big">
          <motion.span className="dsa-stat-big-value" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {inView ? solvedAnim : 0}
          </motion.span>
          <span className="dsa-stat-big-label">Solved</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{inView ? contestsAnim : 0}</span>
          <span className="dsa-stat-big-label">Contests</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{codeforcesStats.contributions}</span>
          <span className="dsa-stat-big-label">Contributions</span>
        </div>
      </div>
      <ContestTimeline contests={codeforcesStats.recentRating} color="#6366f1" />
    </div>
  );
}

function CodeChefSection() {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });
  const stars = Array.from({ length: 5 }, (_, i) => i < codechefStats.stars);

  return (
    <div className="dsa-platform-section" ref={ref}>
      <ProfileHeader platform="CodeChef" username={codechefStats.username} rating={codechefStats.rating} maxRating={codechefStats.maxRating} rank={`★${codechefStats.stars}`} logo="🍳" color="#c084fc" />
      <div className="dsa-stars-row">
        {stars.map((filled, i) => (
          <motion.span
            key={i}
            className={`dsa-star ${filled ? 'filled' : ''}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 14 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      <div className="dsa-stats-row">
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{codechefStats.totalSolved}</span>
          <span className="dsa-stat-big-label">Solved</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{codechefStats.contests}</span>
          <span className="dsa-stat-big-label">Contests</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">#{codechefStats.globalRank}</span>
          <span className="dsa-stat-big-label">Global Rank</span>
        </div>
      </div>
    </div>
  );
}

function GitHubSection() {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });
  const contribAnim = useCountUp(githubStats.thisYear, { duration: 1200, enabled: inView });

  return (
    <div className="dsa-platform-section dsa-github-section" ref={ref}>
      <ProfileHeader platform="GitHub" username={githubStats.username} rank={`${githubStats.repos} repos`} logo="🐙" color="#22c55e" />
      <div className="dsa-stats-row">
        <div className="dsa-stat-big">
          <motion.span className="dsa-stat-big-value" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {inView ? contribAnim : 0}
          </motion.span>
          <span className="dsa-stat-big-label">Contributions (Year)</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{githubStats.totalContributions}</span>
          <span className="dsa-stat-big-label">Total</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{githubStats.stars}</span>
          <span className="dsa-stat-big-label">Stars</span>
        </div>
        <div className="dsa-stat-big">
          <span className="dsa-stat-big-value">{githubStats.streak}</span>
          <span className="dsa-stat-big-label">Day Streak</span>
        </div>
      </div>
      <Heatmap />
    </div>
  );
}

export default function DsaTracker() {
  return (
    <div className="dsa-tracker-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">DSA Tracker</h1>
        <p className="page-desc">Track your competitive programming and coding activity across platforms.</p>
      </motion.div>

      <motion.div
        className="dsa-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <LeetCodeSection />
        </motion.div>
        <motion.div variants={fadeInRight}>
          <CodeforcesSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <CodeChefSection />
        </motion.div>
        <motion.div variants={fadeInRight}>
          <GitHubSection />
        </motion.div>
      </motion.div>

      <motion.div className="dsa-section-skills" variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="section-title">Topic-wise Progress</h2>
        <div className="dsa-skills-grid">
          {subjectProgress.map((sp) => (
            <div key={sp.name} className="dsa-skill-card">
              <ProgressRing value={sp.solved} max={sp.total} size={72} strokeWidth={6} label={sp.name} sub={`${sp.solved}/${sp.total}`} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
