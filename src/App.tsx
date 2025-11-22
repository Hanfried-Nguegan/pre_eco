import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { BottomNavbar } from './components/generated/BottomNavbar';
import { SchedulePickup } from './components/generated/SchedulePickup';
import { MapsPage } from './components/generated/MapsPage';
import { CameraScanner } from './components/generated/CameraScanner';
import { RecycleOrder } from './components/generated/RecycleOrder';
import { DonationsPage } from './components/generated/DonationsPage';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'centered';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'schedule' | 'map' | 'scan' | 'recycle' | 'donations'>('home');

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentPage === 'schedule') {
      return <SchedulePickup onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'map') {
      return <MapsPage onNavigateToHome={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'scan') {
      return <CameraScanner onBack={() => setCurrentPage('home')} onNavigateToRecycleOrder={() => setCurrentPage('recycle')} />;
    }
    if (currentPage === 'recycle') {
      return <RecycleOrder onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'donations') {
      return <DonationsPage onNavigateToHome={() => setCurrentPage('home')} />;
    }
    return <BottomNavbar 
      onNavigateToSchedule={() => setCurrentPage('schedule')}
      onNavigateToMap={() => setCurrentPage('map')}
      onNavigateToScan={() => setCurrentPage('scan')}
      onNavigateToDonations={() => setCurrentPage('donations')}
    />; // %EXPORT_STATEMENT%
  }, [currentPage]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;