import { motion, AnimatePresence } from 'framer-motion';

export function AccordionItem({ id, isOpen, onToggle, title, subtitle, badge, children, depth = 0 }) {
  return (
    <div className={`accordion-item depth-${depth}`}>
      <motion.button
        className={`accordion-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => onToggle(id)}
        whileTap={{ scale: 0.99 }}
      >
        <motion.span
          className="accordion-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          ▸
        </motion.span>

        <div className="accordion-trigger-body">
          <span className="accordion-title">{title}</span>
          {subtitle && <span className="accordion-subtitle">{subtitle}</span>}
        </div>

        {badge != null && <span className="accordion-badge">{badge}</span>}
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="accordion-panel"
            key={`panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}
          >
            <div className="accordion-panel-inner">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AccordionGroup({ children, stagger = 0.04 }) {
  return (
    <motion.div
      className="accordion-group"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AccordionChild({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
      }}
    >
      {children}
    </motion.div>
  );
}
