import { motion } from 'framer-motion';
import { useAnimatedInView } from '../motion';

const grades = [
  { label: 'O', count: 0, color: '#22c55e' },
  { label: 'A+', count: 0, color: '#4ade80' },
  { label: 'A', count: 0, color: '#6366f1' },
  { label: 'B+', count: 0, color: '#8b5cf6' },
  { label: 'B', count: 0, color: '#a78bfa' },
  { label: 'C', count: 0, color: '#f59e0b' },
  { label: 'P', count: 0, color: '#f97316' },
  { label: 'F', count: 0, color: '#ef4444' },
];

export default function GradeChart({ subjects }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });

  const distribution = grades.map((g) => {
    const count = subjects.filter((s) => s.grade?.grade === g.label).length;
    return { ...g, count };
  });

  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div ref={ref} className="grade-chart">
      <div className="grade-chart-bars">
        {distribution.map((d, i) => (
          <div key={d.label} className="grade-chart-col">
            <span className="grade-chart-count">{d.count || ''}</span>
            <motion.div
              className="grade-chart-bar"
              style={{ backgroundColor: d.color }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${(d.count / maxCount) * 100}%` } : { height: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 18 }}
            />
            <span className="grade-chart-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
