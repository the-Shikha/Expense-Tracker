import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { SplashScreen } from './components/ui/SplashScreen'; 

function App() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (authLoading || !minimumTimeElapsed) {
    return <SplashScreen />;
  }

  return <Dashboard />;
}

export default App;