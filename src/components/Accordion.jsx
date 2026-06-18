import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const arrowTransition = { type: 'spring', stiffness: 300, damping: 22 };
const panelTransition = { type: 'spring', stiffness: 260, damping: 26, mass: 0.8 };
const tapScale = { scale: 0.99 };

const childVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

const panelInitial = { height: 0, opacity: 0 };
const panelAnimate = { height: 'auto', opacity: 1 };
const panelExit = { height: 0, opacity: 0 };

function makeGroupVariants(stagger) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

const AccordionItem = memo(function AccordionItem({
  id,
  isOpen,
  onToggle,
  title,
  subtitle,
  badge,
  children,
  depth = 0,
}) {
  const handleToggle = () => onToggle(id);

  return (
    <div className={`accordion-item depth-${depth}`}>
      <motion.button
        className={`accordion-trigger ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        whileTap={tapScale}
      >
        <motion.span
          className="accordion-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={arrowTransition}
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
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={panelTransition}
          >
            <div className="accordion-panel-inner">
              {isOpen ? children : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const AccordionGroup = memo(function AccordionGroup({ children, stagger = 0.04 }) {
  const variants = makeGroupVariants(stagger);

  return (
    <motion.div
      className="accordion-group"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
});

const AccordionChild = memo(function AccordionChild({ children }) {
  return (
    <motion.div variants={childVariants}>
      {children}
    </motion.div>
  );
});

export { AccordionItem, AccordionGroup, AccordionChild };
