import { motion } from 'framer-motion';

export default function PlacementCard({ company, role, package: pkg, deadline, logo }) {
  return (
    <motion.div
      className="placement-card"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
    >
      <div className="placement-card-logo">{logo || '🏢'}</div>
      <div className="placement-card-body">
        <div className="placement-card-company">{company}</div>
        <div className="placement-card-role">{role}</div>
        <div className="placement-card-meta">
          <span className="placement-card-pkg">{pkg}</span>
          {deadline && <span className="placement-card-deadline">⏳ {deadline}</span>}
        </div>
      </div>
    </motion.div>
  );
}
