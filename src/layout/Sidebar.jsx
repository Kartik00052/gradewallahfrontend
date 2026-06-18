import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const sidebarTabs = [
  { id: 'dashboard', label: 'My Dashboard', icon: '📊' },
  { id: 'grades', label: 'My Grades', icon: '📚' },
  { id: 'resources', label: 'Study Resources', icon: '📁' },
  { id: 'analyser', label: 'Result Analyser', icon: '🔍' },
  { id: 'internships', label: 'Internships', icon: '💼' },
  { id: 'placements', label: 'Placements', icon: '🎯' },
  { id: 'dsa', label: 'DSA Tracker', icon: '💻' },
  { id: 'scan', label: 'Scan Result', icon: '📷' },
];

const sidebarSpring = { type: 'spring', stiffness: 300, damping: 28 };
const itemSpring = { type: 'spring', stiffness: 260, damping: 24 };
const glowSpring = { type: 'spring', stiffness: 380, damping: 30 };

export default function Sidebar() {
  const { activeTab, sidebarOpen, closeSidebar, openTab } = useApp();

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
            role="presentation"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="sidebar"
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={sidebarSpring}
        role="dialog"
        aria-modal={sidebarOpen}
        aria-label="Sidebar navigation"
        inert={!sidebarOpen ? '' : undefined}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand" aria-hidden="true">
            <span className="sidebar-logo">🎓</span>
            <span className="sidebar-title">Gradewallah</span>
          </div>
          <button className="sidebar-close" onClick={closeSidebar} aria-label="Close sidebar navigation">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar pages">
          {sidebarTabs.map((tab, i) => (
            <motion.button
              type="button"
              key={tab.id}
              className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => openTab(tab.id)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, ...itemSpring }}
              whileTap={{ scale: 0.97 }}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="sidebar-item-glow"
                  layoutId="sidebar-glow"
                  transition={glowSpring}
                />
              )}
              <span className="sidebar-item-icon" aria-hidden="true">{tab.icon}</span>
              <span className="sidebar-item-label">{tab.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-version">v7.1</span>
        </div>
      </motion.aside>
    </>
  );
}
