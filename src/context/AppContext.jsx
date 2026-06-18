import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'grades', label: 'Grades' },
  { id: 'resources', label: 'Resources' },
  { id: 'analyser', label: 'Analyser' },
  { id: 'internships', label: 'Internships' },
  { id: 'placements', label: 'Placements' },
  { id: 'dsa', label: 'DSA Tracker' },
  { id: 'scan', label: 'Scan Result' },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gradewallah-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gradewallah-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openTab = useCallback((id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        openTab,
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
        theme,
        toggleTheme,
        tabs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
