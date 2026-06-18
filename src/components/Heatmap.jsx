import { motion } from 'framer-motion';
import { useAnimatedInView } from '../motion';
import { generateHeatmapData } from '../utils/dsaData';

const levelColors = ['var(--border)', 'rgba(34,197,94,0.15)', 'rgba(34,197,94,0.35)', 'rgba(34,197,94,0.55)', 'rgba(34,197,94,0.8)'];

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export default function Heatmap({ days = 91 }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.2 });
  const data = generateHeatmapData();
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div ref={ref} className="heatmap">
      <div className="heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day, di) => {
              const level = getLevel(day.count);
              return (
                <motion.div
                  key={day.date}
                  className={`heatmap-cell level-${level}`}
                  title={`${day.date}: ${day.count} contributions`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: (wi * 7 + di) * 0.002, duration: 0.3 }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        {levelColors.map((c, i) => (
          <span key={i} className="heatmap-legend-cell" style={{ backgroundColor: c }} />
        ))}
        <span className="heatmap-legend-label">More</span>
      </div>
    </div>
  );
}
