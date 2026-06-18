import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const navTabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'grades', label: 'Grades', icon: '📚' },
  { id: 'resources', label: 'Resources', icon: '📁' },
  { id: 'analyser', label: 'Analyse', icon: '🔍' },
  { id: 'internships', label: 'Internships', icon: '💼' },
  { id: 'placements', label: 'Placements', icon: '🎯' },
  { id: 'scan', label: 'Scan', icon: '📷' },
];

export default function Navbar() {
  const { activeTab, openTab, toggleSidebar, theme, toggleTheme } = useApp();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="navbar-inner">
        <button className="navbar-hamburger" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="navbar-brand">
          <span className="navbar-logo">🎓</span>
          <span className="navbar-title">Gradewallah</span>
        </div>

        <div className="navbar-tabs">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              className={`navbar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => openTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="navbar-tab-indicator"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="navbar-tab-icon">{tab.icon}</span>
              <span className="navbar-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <button className="navbar-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.div>
        </button>
      </div>
    </motion.nav>
  );
}
