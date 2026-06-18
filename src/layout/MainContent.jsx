import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Grades = lazy(() => import('../pages/Grades'));
const Resources = lazy(() => import('../pages/Resources'));
const Analyser = lazy(() => import('../pages/Analyser'));
const Internships = lazy(() => import('../pages/Internships'));
const Placements = lazy(() => import('../pages/Placements'));
const DsaTracker = lazy(() => import('../pages/DsaTracker'));
const ScanResult = lazy(() => import('../pages/ScanResult'));

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

function PageFallback() {
  return (
    <div className="page-suspense-fallback" role="status" aria-label="Loading page">
      <div className="page-suspense-spinner" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default function MainContent() {
  const { activeTab } = useApp();
  const Page = pages[activeTab];

  return (
    <main className="main-content" id="main-content" aria-label="Page content">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="page-wrapper"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Suspense fallback={<PageFallback />}>
            <Page />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
