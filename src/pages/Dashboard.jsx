import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInRight } from '../motion';
import { StatCard, AnimatedProgressBar, QuickAction, PlacementCard, InternshipCard } from '../components';

const stats = [
  { icon: '📊', label: 'Current CGPA', value: 8, suffix: '.4', sub: '↑ 0.3 from last sem' },
  { icon: '📈', label: 'Current SGPA', value: 8, suffix: '.7', sub: 'Semester 4' },
  { icon: '🎓', label: 'Credits Earned', value: 84, suffix: '/160', sub: '52.5% complete' },
  { icon: '📅', label: 'Semester Progress', value: 68, suffix: '%', sub: '8 weeks in' },
];

const quickActions = [
  { icon: '📝', label: 'Add Grades', desc: 'Enter your semester marks' },
  { icon: '📄', label: 'Scan Result', desc: 'Upload marksheet via OCR' },
  { icon: '🔍', label: 'Analyse', desc: 'Get performance insights' },
  { icon: '💼', label: 'Find Internships', desc: 'AI-matched opportunities' },
];

const placements = [
  { company: 'Google', role: 'Software Engineer', package: '₹24 LPA', deadline: 'Mar 25', logo: '🔵' },
  { company: 'Microsoft', role: 'Frontend Developer', package: '₹18 LPA', deadline: 'Mar 28', logo: '🟦' },
  { company: 'Amazon', role: 'SDE I', package: '₹16 LPA', deadline: 'Apr 2', logo: '🟠' },
];

const internships = [
  { title: 'Frontend Dev Intern', company: 'Flipkart', location: 'Remote', stipend: '₹25k/mo', type: 'Remote' },
  { title: 'ML Research Intern', company: 'Tata Elxsi', location: 'Bangalore', stipend: '₹20k/mo', type: 'Hybrid' },
  { title: 'Full Stack Intern', company: 'Razorpay', location: 'Remote', stipend: '₹30k/mo', type: 'Remote' },
  { title: 'Data Analyst Intern', company: 'Zomato', location: 'Gurgaon', stipend: '₹22k/mo', type: 'On-site' },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <motion.div
        className="dashboard-header"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-desc">Welcome back, Kartik! Here's your academic overview.</p>
        </div>
        <motion.div
          className="dashboard-greeting-emoji"
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.3 }}
        >
          👋
        </motion.div>
      </motion.div>

      <motion.div
        className="stats-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </motion.div>

      <div className="dashboard-grid">
        <motion.div
          className="dashboard-section"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
              >
                <QuickAction {...a} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="dashboard-section"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.25 }}
        >
          <h2 className="section-title">Semester Progress</h2>
          <div className="progress-list">
            <AnimatedProgressBar label="Attendance" value={82} color="#6366f1" delay={0.3} />
            <AnimatedProgressBar label="Assignments" value={90} color="#8b5cf6" delay={0.35} />
            <AnimatedProgressBar label="Lab Work" value={65} color="#a78bfa" delay={0.4} />
            <AnimatedProgressBar label="Quiz Scores" value={78} color="#c084fc" delay={0.45} />
          </div>
        </motion.div>
      </div>

      <div className="dashboard-grid">
        <motion.div
          className="dashboard-section"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <h2 className="section-title">Latest Placements</h2>
            <button className="section-link">View all →</button>
          </div>
          <div className="placement-list">
            {placements.map((p, i) => (
              <motion.div
                key={p.company}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
              >
                <PlacementCard {...p} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="dashboard-section"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.35 }}
        >
          <div className="section-header">
            <h2 className="section-title">Top Internships</h2>
            <button className="section-link">View all →</button>
          </div>
          <div className="internship-list">
            {internships.map((i, idx) => (
              <motion.div
                key={i.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + idx * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
              >
                <InternshipCard {...i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
