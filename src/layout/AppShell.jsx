import { useAuth } from '../auth/AuthContext';
import { AuthScreen } from '../auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

export default function AppShell() {
  const { user, onboardingComplete, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner" />
      </div>
    );
  }

  if (!user || !onboardingComplete) {
    return <AuthScreen />;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <Sidebar />
      <MainContent />
    </div>
  );
}
