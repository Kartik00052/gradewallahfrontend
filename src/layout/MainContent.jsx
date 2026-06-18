import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Dashboard from '../pages/Dashboard';
import Grades from '../pages/Grades';
import Resources from '../pages/Resources';
import Analyser from '../pages/Analyser';
import Internships from '../pages/Internships';
import Placements from '../pages/Placements';
import DsaTracker from '../pages/DsaTracker';
import ScanResult from '../pages/ScanResult';

const pages = {
  dashboard: Dashboard,
  grades: Grades,
  resources: Resources,
  analyser: Analyser,
  internships: Internships,
  placements: Placements,
  dsa: DsaTracker,
  scan: ScanResult,
};

const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 26, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

export default function MainContent() {
  const { activeTab } = useApp();
  const Page = pages[activeTab];

  return (
    <main className="main-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="page-wrapper"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
