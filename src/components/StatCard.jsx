import { motion } from 'framer-motion';
import { useAnimatedInView, useCountUp } from '../motion';

export default function StatCard({ icon, label, value, suffix = '', sub = '', delay = 0 }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.4 });
  const count = useCountUp(value, { duration: 1200, enabled: inView, start: 0 });

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
    >
      <div className="stat-card-header">
        <span className="stat-card-icon">{icon}</span>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value">
        {inView ? count : 0}
        <span className="stat-card-suffix">{suffix}</span>
      </div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </motion.div>
  );
}
