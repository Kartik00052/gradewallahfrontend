import { useAuth } from '../auth/AuthContext';
import { AuthScreen } from '../auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

export default function AppShell() {
  const { user, onboardingComplete, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading" role="status" aria-label="Loading application">
        <div className="app-loading-spinner" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!user || !onboardingComplete) {
    return <AuthScreen />;
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Sidebar />
      <MainContent />
    </div>
  );
}
