import { motion } from 'framer-motion';
import { useAnimatedInView } from '../motion';

export default function SkillGraph({ data }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });
  const maxPct = Math.max(...data.map((d) => d.pct), 1);

  return (
    <div ref={ref} className="skill-graph">
      {data.map((item, i) => (
        <div key={item.name} className="skill-graph-row">
          <span className="skill-graph-label">{item.name}</span>
          <div className="skill-graph-track">
            <motion.div
              className="skill-graph-fill"
              style={{ width: `${(item.pct / maxPct) * 100}%` }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 18 }}
            />
          </div>
          <span className="skill-graph-pct">{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}
