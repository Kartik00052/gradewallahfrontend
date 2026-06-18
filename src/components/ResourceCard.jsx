import { motion } from 'framer-motion';

const typeConfig = {
  video: { icon: '▶️', label: 'Video' },
  notes: { icon: '📝', label: 'Notes' },
  pyq: { icon: '📄', label: 'PYQ' },
  pdf: { icon: '📕', label: 'PDF' },
};

export default function ResourceCard({ resource, index }) {
  const config = typeConfig[resource.type] || { icon: '📁', label: resource.type };

  return (
    <motion.a
      href={resource.url}
      className="resource-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={{
        y: -2,
        borderColor: 'var(--primary)',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="resource-card-icon">{config.icon}</span>
      <span className="resource-card-title">{resource.title}</span>
      <span className="resource-card-type">{config.label}</span>
    </motion.a>
  );
}
