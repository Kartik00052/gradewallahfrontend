import { AppProvider } from './context/AppContext';
import { AuthProvider } from './auth/AuthContext';
import { AppShell } from './layout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
