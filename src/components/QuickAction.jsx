import { motion } from 'framer-motion';
import { cardHover, buttonTap } from '../motion';

export default function QuickAction({ icon, label, desc, onClick }) {
  return (
    <motion.button
      className="quick-action"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      <div className="quick-action-icon">{icon}</div>
      <div className="quick-action-body">
        <div className="quick-action-label">{label}</div>
        {desc && <div className="quick-action-desc">{desc}</div>}
      </div>
      <motion.span
        className="quick-action-arrow"
        variants={buttonTap}
        initial="rest"
        whileTap="tap"
      >
        →
      </motion.span>
    </motion.button>
  );
}
