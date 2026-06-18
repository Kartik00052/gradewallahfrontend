import { motion } from 'framer-motion';
import { useAnimatedInView } from '../motion';

export default function ProgressRing({ value, max = 100, size = 80, strokeWidth = 6, label, sub, color = '#6366f1' }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.4 });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div ref={ref} className="progress-ring-wrap">
      <svg width={size} height={size} className="progress-ring-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-value">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
        >
          {inView ? value : 0}
        </motion.span>
      </div>
      {label && <span className="progress-ring-label">{label}</span>}
      {sub && <span className="progress-ring-sub">{sub}</span>}
    </div>
  );
}
