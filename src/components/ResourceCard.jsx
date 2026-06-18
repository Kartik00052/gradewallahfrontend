import { memo } from 'react';
import { motion } from 'framer-motion';

const typeConfig = {
  video: { icon: '▶️', label: 'Video' },
  notes: { icon: '📝', label: 'Notes' },
  pyq: { icon: '📄', label: 'PYQ' },
  pdf: { icon: '📕', label: 'PDF' },
};

const FALLBACK_CONFIG = { icon: '📁', label: 'File' };

const cardInitial = { opacity: 0, y: 10 };
const cardAnimate = { opacity: 1, y: 0 };
const cardHover = {
  y: -2,
  borderColor: 'var(--primary)',
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};
const cardTap = { scale: 0.98 };

const cardTransition = { type: 'spring', stiffness: 260, damping: 24 };

const ResourceCard = memo(function ResourceCard({ resource, index }) {
  const config = typeConfig[resource.type] || FALLBACK_CONFIG;

  return (
    <motion.a
      href={resource.url}
      className="resource-card"
      initial={cardInitial}
      animate={cardAnimate}
      transition={{ ...cardTransition, delay: index * 0.04 }}
      whileHover={cardHover}
      whileTap={cardTap}
    >
      <span className="resource-card-icon">{config.icon}</span>
      <span className="resource-card-title">{resource.title}</span>
      <span className="resource-card-type">{config.label}</span>
    </motion.a>
  );
});

export default ResourceCard;
