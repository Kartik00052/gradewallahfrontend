import { motion } from 'framer-motion';
import { useAnimatedInView } from '../motion';

export default function AnimatedProgressBar({ label, value, max = 100, color = '#6366f1', delay = 0 }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.4 });
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className="progress-bar-wrap">
      <div className="progress-bar-header">
        <span className="progress-bar-label">{label}</span>
        <span className="progress-bar-pct">{inView ? Math.round(pct) : 0}%</span>
      </div>
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
          transition={{ delay, type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }}
        />
      </div>
    </div>
  );
}
